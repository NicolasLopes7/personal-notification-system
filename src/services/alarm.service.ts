import { PrismaClient } from '.prisma/client';
import {
  CreateAlarmDTO,
  GetAlarmDTO,
  UpdateAlarmDTO,
} from '../interfaces/alarm.interface';
import alarmQueue from '../queues/alarm.queue';

const prisma = new PrismaClient();
class AlarmService {
  async create({ payload, options }: CreateAlarmDTO) {
    const alarm = await prisma.alarm.create({
      data: {
        ...payload,
        ...options,
      },
    });

    alarmQueue.add(
      {
        name: 'test',
        deviceId: 1,
      },
      { delay: 5000 }
    );

    return alarm;
  }

  async get({ id }: GetAlarmDTO) {
    const alarms = await prisma.alarm.findMany({
      include: { alarmEvents: true },
      where: { id },
    });

    return alarms;
  }

  async update({ id, payload }: UpdateAlarmDTO) {
    const alarm = await prisma.alarm.update({
      data: payload,
      where: { id },
    });

    return alarm;
  }
}

export default new AlarmService();
