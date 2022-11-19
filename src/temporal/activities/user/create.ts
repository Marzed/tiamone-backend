import User from '../../../models/user';
import mongoose from 'mongoose';
import { StatusAccountExist, StatusError, StatusSuccess } from '../../../constants/response';
import Logger from '../../../logger/logger';
import { MongoCodeDuplicate } from '../../../constants/mongo-code';

export async function createUser(email: string, password: string): Promise<string> {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    email,
    password,
  });

  return await user
    .save()
    .then(() => {
      return StatusSuccess;
    })
    .catch((error) => {
      Logger.error('createUser', error);
      switch (error.code) {
        case MongoCodeDuplicate:
          return StatusAccountExist;
        default:
          return StatusError;
      }
    });
}
