import moment from 'moment';

type dateParam = moment.Moment | string;

export const getDiffInMS = (date1: dateParam, date2: dateParam) => {
  return Math.abs(moment(date1).diff(date2));
};
