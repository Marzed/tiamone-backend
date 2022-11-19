import User from '../../../models/user';
import { Types } from 'mongoose';
import { StatusAccountNotFound, StatusError, StatusSuccess } from '../../../constants/response';
import Logger from '../../../logger/logger';

export const deleteUserById = (
  id: string
): Promise<typeof StatusSuccess | typeof StatusError | typeof StatusAccountNotFound> => {
  return User.findByIdAndDelete(new Types.ObjectId(id))
    .exec()
    .then((result) => {
      if (!result) return StatusAccountNotFound;
      return StatusSuccess;
    })
    .catch((error) => {
      Logger.error('getUserByID', error.message);
      return StatusError;
    });
};
