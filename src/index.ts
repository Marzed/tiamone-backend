import mongoose from 'mongoose';
import { config } from './config/config';
import userRoutes from './routes/user';
import authRoutes from './routes/auth';
import * as send from './constants/response';
const express = require('express');
const app = express();
import Logger from './logger/logger';

const bodyParser = require('body-parser');
const cors = require('cors');

const StartServer = () => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get('/', (req: any, res: any, next: any) => {
    send.Success(res);
    return;
  });

  app.use('/api/user', userRoutes);
  app.use('/api/auth', authRoutes);

  // unknown path
  app.use((req: any, res: any, next: any) => {
    return send.Unknown(res);
  });

  app.listen(config.server.port, () =>
    Logger.info('Startup', 'Start API on port: ' + config.server.port)
  );
};

StartServer();
