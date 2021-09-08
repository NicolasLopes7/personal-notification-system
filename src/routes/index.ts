import { Router } from 'express';
import alarmRoutes from './alarm.routes';
import deviceRoutes from './device.routes';

const routes = Router();

routes.use('/alarm', alarmRoutes);
routes.use('/device', deviceRoutes);

routes.get('/healthcheck', (req, res) => {
  return res.sendStatus(200);
});

export default routes;
