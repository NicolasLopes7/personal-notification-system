import { AlarmEvent, DeviceType } from '.prisma/client';
import { Attributes } from './common.interface';

export interface CreateAlarmEventDTO {
  type: DeviceType;
  alarmId: number;
  deviceId: number;
}

export interface UpdateAlarmEventDTO {
  id: number;
  payload: {
    interacted: boolean;
  };
  attributes?: Attributes<AlarmEvent>;
}

export interface BulkUpdateAlarmEventDTO
  extends Omit<UpdateAlarmEventDTO, 'id' | 'attributes'> {
  ids: number[];
}
