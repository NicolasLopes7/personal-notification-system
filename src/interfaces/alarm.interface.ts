import { DeviceType } from '.prisma/client';
import moment from 'moment';

export interface CreateAlarmDTO {
  payload: {
    name: string;
    alarmDate: string;
  };
  options: {
    recurrent: boolean;
    weekend: boolean;
  };
}

export interface GetAlarmDTO {
  id?: number;
}

export interface UpdateAlarmDTO {
  id: number;
  payload: {
    name?: string;
    alarmDate?: string;
    recurrent?: boolean;
    weekend?: boolean;
    finished?: boolean;
  };
  attributes?: {
    id?: boolean;
    name?: boolean;
    alarmDate?: boolean;
    recurrent?: boolean;
    weekend?: boolean;
    finished?: boolean;
    alarmEvents?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };
}

export interface AddAlarmJobDTO {
  alarm: {
    id: number;
    name: string;
    recurrent: boolean;
    weekend: boolean;
    alarmDate: moment.Moment | string;
  };
  device: {
    id: number;
    type: DeviceType;
  };
}

export interface AlarmJobDTO {
  device: {
    id: number;
    type: DeviceType;
  };
  alarm: {
    id: number;
    name: string;
    recurrent: boolean;
    weekend: boolean;
  };
}
