/*
  Warnings:

  - Added the required column `alarmId` to the `AlarmEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AlarmEvent" ADD COLUMN     "alarmId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "AlarmEvent" ADD CONSTRAINT "AlarmEvent_alarmId_fkey" FOREIGN KEY ("alarmId") REFERENCES "Alarm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
