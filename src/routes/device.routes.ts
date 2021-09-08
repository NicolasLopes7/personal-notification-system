import { Router } from 'express';
import DeviceController from '../controllers/device.controller';

const routes = Router();

routes.post('/', DeviceController.create);
routes.put('/deactivate/:id', DeviceController.deactivate);
export default routes;
