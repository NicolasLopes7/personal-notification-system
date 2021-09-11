import { DeviceType } from '@prisma/client';

export interface CreateDeviceDTO {
  name: string;
  type: DeviceType;
}

export interface DeactivateDeviceDTO {
  id: number;
}

export interface GetDevicesDTO {
  filters?: {
    active?: boolean;
    type?: DeviceType;
  };
  options?: {
    first?: boolean;
  };
}
