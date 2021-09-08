import { PrismaClient } from '.prisma/client';
import {
  CreateAlarmDTO,
  GetAlarmDTO,
  UpdateAlarmDTO,
} from '../interfaces/alarm.interface';

const prisma = new PrismaClient();
class AlarmService {
  async create({ payload, options }: CreateAlarmDTO) {
    const alarm = await prisma.alarm.create({
      data: { ...payload, ...options },
    });

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
