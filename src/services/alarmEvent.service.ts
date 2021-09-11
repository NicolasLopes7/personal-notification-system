import { PrismaClient } from '@prisma/client';
import { CreateAlarmEventDTO, updateAlarmEventDTO } from '../interfaces/alarmEvent.interface';
const prisma = new PrismaClient();

class AlarmEventService {
  async create(data: CreateAlarmEventDTO) {
    const alarmEvent = await prisma.alarmEvent.create({ data });
    return alarmEvent;
  }

  async update({ id, payload, attributes }: updateAlarmEventDTO) {
    const alarm = await prisma.alarm.update({
      data: payload,
      where: { id },
      select: attributes,
    });

    return alarm;
  }
}

export default new AlarmEventService();
