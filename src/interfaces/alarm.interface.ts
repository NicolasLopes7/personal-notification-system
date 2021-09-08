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
  id: number;
}

export interface UpdateAlarmDTO {
  id: number;
  payload: {
    name?: string;
    alarmDate?: string;
    recurrent?: boolean;
    weekend?: boolean;
  };
}
