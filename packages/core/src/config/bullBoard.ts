import { createBullBoard } from 'bull-board';
import { BullAdapter } from 'bull-board/bullAdapter';
import alarmQueue from '../queues/alarm.queue';

const { router } = createBullBoard([new BullAdapter(alarmQueue)]);

export default router;
