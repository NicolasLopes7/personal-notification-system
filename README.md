# Personal Notification System

### This project allows you to never forget your appointments, habits and things that you need to do.

First of all, the system will send a push notification for your computer, if you don't interact,
will send for your cellphone, and if the priority is high and you doesn't interacted with both
the system will call you.

## How it works 💫:
First of all let's describe what we're using. We're using redis to manage the background jobs, MQTT for publish in a topic, 
TODO:

- [x] Create models
- [x] Configurate Dockerfile
- [x] Setup Typescript and Prisma
- [x] Create Alarm CRUD
- [x] Create device CRUD
- [x] Create Alarm Queue for redis
- [x] Add redis on docker-compose
- [x] Create function to process the Alarm Queue
- [x] Create the MQTT publisher
- [x] Add bull board to debug the redis queues
- [x] Make the process redis queue function add new jobs when is recurrent
- [x] Create basic README
- [ ] Create postback for the computer device worker
- [ ] Create the Telegram bot
- [ ] Create a class that allows to send a message for Telegram
- [ ] Add interacted field on `AlarmEvent` model
- [ ] Add finished field on `Alarm` model
- [ ] Turn this repo in a monorepo
- [ ] Create the computer slave
  - [ ] Create the mqtt subscriber
  - [ ] setup `node-notifier`
  - [ ] Add to readme how to setup the `node-notifier`
  - [ ] Create a notificationService
  - [ ] Handle in notificationService, if the user interact with the notification
  - [ ] When the notification disappear, send a postback to the core-service
- [ ] Create beautiful README

## How to run

Ensure that you have node.js and docker setupped,

- Copy the content of `.env.example` and paste in `.env` with the values that you want
- Run `docker-compose up --build`
- Run `yarn`
- Run `Prisma Generate`
- Run `yarn dev`
- Your application are running 😃

>  if you're not on MacOS system, remove the line 8 of `prisma/schema.prisma` with `binaryTargets = ["native"]`

> You can install [node](https://nodejs.org/en/) and [docker](https://docs.docker.com/desktop/windows/install/) in these links
