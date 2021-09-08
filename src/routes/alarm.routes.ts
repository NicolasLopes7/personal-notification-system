import { Router } from 'express';
import {
  CreateAlarmValidator,
  GetAlarmValidator,
  UpdateAlarmValidator,
} from '../validators/alarm.validator';
import validate from '../validators/common.validator';

const routes = Router();

routes.post('/', CreateAlarmValidator, validate);
routes.get('/');
routes.get('/:id', GetAlarmValidator, validate);
routes.put('/', UpdateAlarmValidator, validate);

export default routes;
