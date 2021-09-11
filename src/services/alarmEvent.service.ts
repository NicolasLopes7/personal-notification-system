import { PrismaClient } from '@prisma/client';
import { CreateAlarmEventDTO } from '../interfaces/alarmEvent.interface';
const prisma = new PrismaClient();

class AlarmEventService {
  async create(data: CreateAlarmEventDTO) {
    const alarmEvent = await prisma.alarmEvent.create({ data });
    return alarmEvent;
  }
}

export default new AlarmEventService();
