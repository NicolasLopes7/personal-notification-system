# Personal Notification System

### This project allows you to never forget your appointments, habits and things that you need to do.

First of all, the system will send a push notification for your computer, if you don't interact,
will send for your cellphone, and if the priority is high and you doesn't interacted with both
the system will call you.

TODO:

- [x] Create models
- [x] Configurate Dockerfile
- [x] Setup Typescript and Prisma
- [ ] Create Alarm CRUD
- [x] Create device CRUD
- [ ] Create pre-post hooks to deal with the push notification sending
- [ ] Create a web view for the system
- [ ] Think'bout the way that i'll send push notification for cellphone (need to works in android and iOS)
- [ ] Create beautiful README
- [x] Create basic README

## How to run

Ensure that you have node.js and docker setupped,

- Copy the content of `.env.example` and paste in `.env` with the values that you want
- Run `docker-compose up --build`
- Run `yarn`
- Run `Prisma Generate`
- Run `yarn dev`
- Your application are running 😃

>  if you're not on MacOS system, remove the line 8 of `prisma/schema.prisma` with the content `binaryTargets = ["native"]`

> You can install [node](https://nodejs.org/en/) and [docker](https://docs.docker.com/desktop/windows/install/) in these links
