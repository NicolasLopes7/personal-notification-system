import { PrismaClient } from '@prisma/client';
import {
  CreateAlarmDTO,
  GetAlarmDTO,
  UpdateAlarmDTO,
} from '../interfaces/alarm.interface';

import DeviceService from './device.service';
import AlarmQueueService from './alarmQueue.service';

const prisma = new PrismaClient();
class AlarmService {
  async create({ payload, options }: CreateAlarmDTO) {
    const alarm = await prisma.alarm.create({
      data: {
        ...payload,
        ...options,
      },
    });

    const [computerDevice] = await DeviceService.get({
      filters: { type: 'computer' },
      options: { first: true },
    });

    AlarmQueueService.add({ alarm, device: computerDevice });

    return alarm;
  }

  async get(id?: number) {
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
