import { PrismaClient } from '.prisma/client';
import {
  CreateDeviceDTO,
  DeactivateDeviceDTO,
  GetDevicesDTO,
} from '../interfaces/device.interfaces';

const prisma = new PrismaClient();

class DeviceService {
  async create({ name, type }: CreateDeviceDTO) {
    const device = await prisma.device.create({
      data: {
        name,
        type,
      },
    });

    return device;
  }

  async deactivate({ id }: DeactivateDeviceDTO) {
    await prisma.device.update({
      data: {
        active: false,
      },
      where: {
        id,
      },
    });
  }

  async get({ filters, options }: GetDevicesDTO) {
    const devices = await prisma.device.findMany({
      where: filters,
      take: options?.first ? 1 : undefined,
    });

    return devices;
  }
}

export default new DeviceService();
