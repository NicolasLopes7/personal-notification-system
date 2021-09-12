# Personal Notification System

## How it works 💫

What i'm using:

- **Redis** to manage the background jobs, the feature of delay is the core of our system.
- **MQTT** for publish in a topic.
- **Prisma w/ postgres** to manage the alarms.
- **Typescript** to have a consistent code.
- **Express-validator** to validate the request bodies, queries and params as a middleware.
- **Bull** to manage the redis jobs.
- **Moment** to get easier work with dates 🥵

Basically, we've the HTTP endpoint `POST /alarm` that expect to receive in their body these params:

```json
{
  "name": "Name of the alarm",
  "alarmDate": "A date ISO8601 valid",
  "recurrent": "boolean",
  "weekend": "boolean"
}
```

After that, a job delayed (diff in MS between now and the `alarmDate`) will be sent to Redis on `AlarmQueue`.
On the function execution, it will verify if is `recurrent`, and have the `weekend` param as true.

- `recurrent: true` and `weekend: false`: Will reschedule the next alarm to 1 day after.
- `recurrent: true` and `weekend: true`: Will reschedule the next alarm to the next weekday.
  - if the actual day is saturday, will reschedule in 2 days.
  - if the actual day is sunday, will reschedule in 1 day.

When finnaly the process function of the queue are executed, it publish in a `MQTT topic` with the suffix as the `deviceId`.
The slave module (worker) will be subscribed on this topic, and when them receive a message, will show a notification on computer screen for along 10 seconds.
If the user interact with the notification meanwhile, set the property `interacted` as true, else set as false. After that, the slave will send a postback for
`POST /alarm/postback/:id` passing the alarmId on the URL param, and the property `interacted` on the request body. If `interacted` is false, the service will send a message to telegram and will notify on the cellphone.

## How to run

Ensure that you have node.js and docker setupped,

- Copy the content of `.env.example` and paste in `.env` with the values that you want
- Run `docker-compose up --build`
- Run `yarn`
- Run `Prisma Generate`
- Run `yarn dev`
- Your application are running 😃

> if you're not on MacOS system, remove the line 8 of `prisma/schema.prisma` with `binaryTargets = ["native"]`

> You can install [node](https://nodejs.org/en/) and [docker](https://docs.docker.com/desktop/windows/install/) in these links

## TODO:

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
- [x] Add interacted field on `AlarmEvent` model
- [x] Add finished field on `Alarm` model
- [x] Create postback for the computer device worker
- [ ] Create the Telegram bot
- [x] Create a service that allows to send a message for Telegram
- [x] Turn this repo in a monorepo
- [x] Create the computer worker module
  - [x] Create the mqtt subscriber
  - [x] setup `node-notifier`
  - [x] Create a notificationService
  - [x] Handle in notificationService, if the user interact with the notification
  - [x] When the notification disappear, send a postback to the core-service
- [ ] Create beautiful README
