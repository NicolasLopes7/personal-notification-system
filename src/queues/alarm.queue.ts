import Queue from 'bull';
import redisConfig from '../config/redis';
import { AlarmJobDTO } from '../interfaces/alarm.interface';
import MQTTService from '../services/mqtt.service';
import AlarmEventService from '../services/alarmEvent.service';
import { getRemainingDays } from '../utils/alarmQueue.utils';

const DAY_IN_MS = 8.64 * Math.pow(10, 7);

const mqttService = new MQTTService();
const alarmQueue = new Queue('send alarm', {
  redis: redisConfig,
});

alarmQueue.process(async (job) => await sendAlarm(job.data));

async function sendAlarm({ device, alarm }: AlarmJobDTO) {
  mqttService.sendMessageToTopic(
    device.id,
    JSON.stringify({
      id: alarm.id,
      name: alarm.name,
    })
  );

  if (alarm.recurrent) {
    const remainingDays = getRemainingDays(alarm);
    alarmQueue.add({ device, alarm }, { delay: DAY_IN_MS * remainingDays });
  }

  await AlarmEventService.create({
    alarmId: alarm.id,
    deviceId: device.id,
    type: device.type,
  });
}

export default alarmQueue;
