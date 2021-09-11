import { PrismaClient, Alarm } from '@prisma/client';
import {
  CreateAlarmDTO,
  GetAlarmDTO,
  UpdateAlarmDTO,
} from '../interfaces/alarm.interface';

import DeviceService from './device.service';
import AlarmQueueService from './alarmQueue.service';
import { Attributes } from '../interfaces/common.interface';

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

  async get(id?: number, attributes?: Attributes<Alarm>) {
    const alarms = await prisma.alarm.findUnique({
      where: { id },
      select: attributes,
    });

    return alarms;
  }

  async index(attributes: Attributes<Alarm>) {
    const alarms = await prisma.alarm.findMany({
      select: attributes,
    });

    return alarms;
  }

  async update({ id, payload, attributes }: UpdateAlarmDTO) {
    const alarm = await prisma.alarm.update({
      data: payload,
      where: { id },
      select: attributes,
    });

    return alarm;
  }
}

export default new AlarmService();
