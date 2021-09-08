import { Request, Response } from 'express';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class DeviceController {
  async create(req: Request, res: Response) {
    const { name, type } = req.body;

    const createdDevice = await prisma.device.create({
      data: {
        name,
        type,
      },
    });
    return res.json({
      device: createdDevice,
    });
  }

  async deactivate(req: Request, res: Response) {
    const { id } = req.params;

    await prisma.device.update({
      data: {
        active: false,
      },
      where: {
        id: Number(id),
      },
    });

    return res.sendStatus(200);
  }
}

export default new DeviceController();
