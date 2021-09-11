import { Router } from 'express';
import AlarmController from '../controllers/alarm.controller';
import {
  CreateAlarmValidator,
  GetAlarmValidator,
  UpdateAlarmValidator,
} from '../validators/alarm.validator';
import validate from '../validators/common.validator';

const routes = Router();

routes.post('/', CreateAlarmValidator, validate, AlarmController.create);
routes.get('/:id', GetAlarmValidator, validate, AlarmController.get);
routes.get('/', AlarmController.index)
routes.put('/:id', UpdateAlarmValidator, validate, AlarmController.update);

export default routes;
