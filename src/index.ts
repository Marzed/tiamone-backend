import mongoose from 'mongoose';
import { config } from './config/config';
import userRoutes from './routes/user';
import authRoutes from './routes/auth';
import * as send from './constants/response';
const express = require('express');
const index = express();
import Logger from './logger/logger';

const bodyParser = require('body-parser');
const cors = require('cors');

const StartServer = () => {
  index.use(cors());
  index.use(bodyParser.json());
  index.use(bodyParser.urlencoded({ extended: true }));

  index.get('/', (req: any, res: any, next: any) => {
    send.Success(res);
    return;
  });

  index.use('/api/user', userRoutes);
  index.use('/api/auth', authRoutes);

  // unknown path
  index.use((req: any, res: any, next: any) => {
    return send.Unknown(res);
  });

  index.listen(config.server.port, () =>
    Logger.info('Startup', 'Start API on port: ' + config.server.port)
  );
};

StartServer();
