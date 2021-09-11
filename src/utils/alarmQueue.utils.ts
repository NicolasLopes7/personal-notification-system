import moment from 'moment';

type GetRemainingDaysParams = { weekend: boolean };
export const getRemainingDays = ({ weekend }: GetRemainingDaysParams) => {
  let remainingDays = 1;

  const tomorrow = moment().add(1, 'days');
  const isWeekend = tomorrow.day() % 6 === 0;

  if (!weekend && isWeekend) {
    remainingDays += tomorrow.day() === 6 ? 2 : 1;
  }

  return remainingDays;
};
