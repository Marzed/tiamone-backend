import { Worker } from '@temporalio/worker';
import * as activities from '../activities/activities';
import mongoose from 'mongoose';
import { config } from '../../config/config';
import Logger from '../../logger/logger';

run().catch((err) => console.log(err));

async function run() {
  mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
      Logger.info('Worker', 'Connected to mongoDB');
    })
    .catch((error) => {
      Logger.info('Worker', 'Unable to connect:');
      Logger.info('Worker', error);
    });

  const worker = await Worker.create({
    workflowsPath: require.resolve('../workflows/workflows'),
    activities,
    taskQueue: config.taskQueue.dev,
  });
  await worker.run();
}
