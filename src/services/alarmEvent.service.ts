import { PrismaClient } from '@prisma/client';
import {
  BulkUpdateAlarmEventDTO,
  CreateAlarmEventDTO,
  UpdateAlarmEventDTO,
} from '../interfaces/alarmEvent.interface';
const prisma = new PrismaClient();

class AlarmEventService {
  async create(data: CreateAlarmEventDTO) {
    const alarmEvent = await prisma.alarmEvent.create({ data });
    return alarmEvent;
  }

  async update({ id, payload, attributes }: UpdateAlarmEventDTO) {
    const alarmEvent = await prisma.alarmEvent.update({
      data: payload,
      where: { id },
      select: attributes,
    });

    return alarmEvent;
  }

  async bulkUpdate({ ids, payload }: BulkUpdateAlarmEventDTO) {
    const updatedAlarmEvents = await prisma.alarmEvent.updateMany({
      where: {
        id: {
          in: ids,
        },
      },
      data: payload,
    });

    return updatedAlarmEvents;
  }
}

export default new AlarmEventService();
