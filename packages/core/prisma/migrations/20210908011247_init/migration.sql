-- CreateEnum
CREATE TYPE "DeviceType" AS ENUM ('cellphone', 'computer');

-- CreateEnum
CREATE TYPE "AlarmType" AS ENUM ('cellphone', 'computer');

-- CreateTable
CREATE TABLE "Alarm" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR NOT NULL,
    "alarmDate" TEXT NOT NULL,
    "recurrent" BOOLEAN NOT NULL DEFAULT false,
    "weekend" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Alarm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Device" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" "DeviceType" NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlarmEvent" (
    "id" SERIAL NOT NULL,
    "type" "AlarmType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "interacted" BOOLEAN NOT NULL DEFAULT false,
    "deviceId" INTEGER NOT NULL,

    CONSTRAINT "AlarmEvent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AlarmEvent" ADD CONSTRAINT "AlarmEvent_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
