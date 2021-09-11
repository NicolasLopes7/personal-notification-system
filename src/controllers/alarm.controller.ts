import { Request, Response } from 'express';
import AlarmService from '../services/alarm.service';

class AlarmController {
  async create(req: Request, res: Response) {
    const { recurrent, weekend, ...payload } = req.body;
    const options = { recurrent, weekend };

    try {
      const createdAlarm = await AlarmService.create({ payload, options });
      return res.json({ alarm: createdAlarm });
    } catch (error) {
      return res.sendStatus(500);
    }
  }

  async get(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const alarm = await AlarmService.get(Number(id));
      return res.json({ alarm });
    } catch (error) {
      return res.sendStatus(500);
    }
  }

  async index(req: Request, res: Response) {
    try {
      const alarms = await AlarmService.get();
      return res.json({ alarms });
    } catch (error) {
      return res.sendStatus(500);
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const payload = req.body;

    try {
      const updatedAlarm = await AlarmService.update({
        id: Number(id),
        payload,
      });

      return res.json({
        alarm: updatedAlarm,
      });
    } catch (error) {
      return res.sendStatus(500);
    }
  }
}

export default new AlarmController();
