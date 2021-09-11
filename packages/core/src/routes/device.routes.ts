import { Router } from 'express';
import DeviceController from '../controllers/device.controller';
import validate from '../validators/common.validator';
import {
  createDeviceValidator,
  deactivateDeviceValidator,
  getDevicesValidator,
} from '../validators/device.validator';

const routes = Router();

routes.post('/', createDeviceValidator, validate, DeviceController.create);
routes.put(
  '/deactivate/:id',
  deactivateDeviceValidator,
  validate,
  DeviceController.deactivate
);
routes.get('/', getDevicesValidator, validate, DeviceController.get);
export default routes;
