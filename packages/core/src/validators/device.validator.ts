import { body, param, query } from 'express-validator';

export const createDeviceValidator = [
  body('name').isString(),
  body('type').isIn(['computer', 'cellphone']),
];

export const deactivateDeviceValidator = [param('id').isNumeric()];

export const getDevicesValidator = [query(['active']).isBoolean().optional()];
