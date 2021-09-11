import { Request, Response } from 'express';

import DeviceService from '../services/device.service';

class DeviceController {
  async create(req: Request, res: Response) {
    const payload = req.body;

    try {
      const createdDevice = await DeviceService.create(payload);
      return res.json({
        device: createdDevice,
      });
    } catch (error) {
      return res.sendStatus(500);
    }
  }

  async deactivate(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await DeviceService.deactivate({ id: Number(id) });
      return res.sendStatus(200);
    } catch (error) {
      return res.sendStatus(500);
    }
  }

  async get(req: Request, res: Response) {
    const filters = req.query;

    try {
      const devices = await DeviceService.get(filters);
      return res.json({ devices });
    } catch (error) {
      return res.sendStatus(500);
    }
  }
}

export default new DeviceController();
