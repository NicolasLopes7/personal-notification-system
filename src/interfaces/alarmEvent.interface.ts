import { DeviceType } from '.prisma/client';

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
  attributes?: {
    id?: boolean;
    type?: boolean;
    alarmId?: boolean;
    deviceId?: boolean;
    interacted?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };
}

export interface BulkUpdateAlarmEventDTO
  extends Omit<UpdateAlarmEventDTO, 'id' | 'attributes'> {
  ids: number[];
}
