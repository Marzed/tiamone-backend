import mongoose, { Error } from 'mongoose';
import { config } from './config/config';
import userRoutes from './routes/user';
import * as send from './constants/response';
const express = require('express');
const app = express();
import Logger from './logger/logger';

const bodyParser = require('body-parser');
const cors = require('cors');

mongoose
  .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
  .then(() => {
    Logger.info('Startup', 'Connected to mongoDB');
    StartServer();
  })
  .catch((error) => {
    Logger.info('Startup', 'Unable to connect:');
    Logger.info('Startup', error);
  });

const StartServer = () => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get('/', (req: any, res: any, next: any) => {
    send.Success(res);
    return;
  });

  app.use('/api/user', userRoutes);

  // unknown path
  app.use((req: any, res: any, next: any) => {
    return send.Unknown(res);
  });

  app.listen(process.env.SERVER_PORT, () =>
    Logger.info('Startup', 'Start API on port: ' + process.env.SERVER_PORT)
  );
};
