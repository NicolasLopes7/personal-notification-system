require('dotenv').config();
import express from 'express';
import cors from 'cors';

import routes from './routes';
import bullBoardRouter from './config/bullBoard';
import logRequestsMiddleware from './middlewares/logRequests.middleware';

const server = express();

server.use(express.json());
server.use(cors());

if (process.env.NODE_ENV !== 'production') {
  server.use(logRequestsMiddleware);
  server.use('/admin/queues', bullBoardRouter);
}

server.use(routes);
server.listen(process.env.PORT || 5000);
