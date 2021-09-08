import { PrismaClient, DeviceType } from '@prisma/client';
import Queue from 'bull';
import mqtt from 'mqtt';
import redisConfig from '../config/redis';

interface SendAlarmJobData {
  device: {
    id: number;
    type: DeviceType;
  };
  alarm: {
    id: number;
    name: string;
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

  await prisma.alarmEvent.create({
    data: {
      type: device.type,
      alarmId: alarm.id,
      deviceId: device.id,
    },
  });
}

export default alarmQueue;
