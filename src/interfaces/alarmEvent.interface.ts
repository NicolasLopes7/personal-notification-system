import { DeviceType } from '.prisma/client';

export interface CreateAlarmEventDTO {
  type: DeviceType;
  alarmId: number;
  deviceId: number;
}

export interface updateAlarmEventDTO {
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
