import { DeviceType } from ".prisma/client";

export interface CreateAlarmEventDTO {
    type: DeviceType,
    alarmId: number,
    deviceId: number,
}
