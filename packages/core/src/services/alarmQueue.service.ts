import alarmQueue from '../queues/alarm.queue';
import { getDiffInMS } from '../utils/date.utils';
import moment from 'moment';
import { AddAlarmJobDTO } from '../interfaces/alarm.interface';

class AlarmQueueService {
  add({ alarm, device }: AddAlarmJobDTO) {
    return alarmQueue.add(
      {
        alarm: {
          id: alarm.id,
          name: alarm.name,
          recurrent: alarm.recurrent,
          weekend: alarm.weekend,
        },
        device: {
          id: device.id,
          type: device.type,
        },
      },
      { delay: getDiffInMS(moment(alarm.alarmDate), moment()) }
    );
  }
}

export default new AlarmQueueService();
