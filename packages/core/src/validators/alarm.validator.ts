import { body, param } from 'express-validator';

export const CreateAlarmValidator = [
  body('name').isString(),
  body('alarmDate').isISO8601(),
  body('recurrent').isBoolean(),
  body('weekend').isBoolean(),
];
export const GetAlarmValidator = [param('id').isNumeric()];

export const UpdateAlarmValidator = [
  body('name').isString().optional(),
  body('alarmDate').isDate().optional(),
  body('recurrent').isBoolean().optional(),
  body('weekend').isBoolean().optional(),
];

export const AlarmPostbackValidator = [
  param('id').isNumeric(),
  body('interacted').isBoolean(),
];
