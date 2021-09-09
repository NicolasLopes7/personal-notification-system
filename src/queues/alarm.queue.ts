import { PrismaClient, DeviceType } from '@prisma/client';
import moment from 'moment';
import Queue from 'bull';
import mqtt from 'mqtt';
import redisConfig from '../config/redis';

const DAY_IN_MS = 24 * 60 * 60;

interface SendAlarmJobData {
  device: {
    id: number;
    type: DeviceType;
  };
  alarm: {
    id: number;
    name: string;
    recurrent: boolean;
    weekend: true;
  };
}

const alarmQueue = new Queue('send alarm', {
  redis: redisConfig,
});

alarmQueue.process(async (job) => await sendAlarm(job.data));

async function sendAlarm({ device, alarm }: SendAlarmJobData) {
  const mqttClient = mqtt.connect('mqtt://broker.hivemq.com');
  const prisma = new PrismaClient();

  mqttClient.on('connect', () => {
    mqttClient.publish(`personal-notification-system/${device.id}`, alarm.name);
  });

  if (alarm.recurrent) {
    let remainingDays = 1;

    const tomorrow = moment().add(1, 'days');
    const isWeekend = tomorrow.day() % 6 === 0;

    if (!alarm.weekend && isWeekend) {
      remainingDays += tomorrow.day() === 6 ? 2 : 1;
    }

    alarmQueue.add({ device, alarm }, { delay: DAY_IN_MS * remainingDays });
  }

  await prisma.alarmEvent.create({
    data: {
      type: device.type,
      alarmId: alarm.id,
      deviceId: device.id,
    },
  });
}

export default alarmQueue;
