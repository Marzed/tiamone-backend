import User from '../../../models/user';
import { Types } from 'mongoose';
import { StatusAccountNotFound, StatusError } from '../../../constants/response';
import Logger from '../../../logger/logger';
import IUser from '../../../interfaces/user';

export interface SearchUserResult {
  data: IUser;
  error: typeof StatusError | typeof StatusAccountNotFound | null;
}

export const getUserById = (id: string): Promise<SearchUserResult> => {
  return User.findById(new Types.ObjectId(id))
    .exec()
    .then((result: IUser) => {
      if (!result) {
        return <SearchUserResult>{
          data: {},
          error: StatusAccountNotFound,
        };
      }

      return <SearchUserResult>{
        data: result,
        error: null,
      };
    })
    .catch((error) => {
      Logger.error('getUserByID', error.message);
      return <SearchUserResult>{
        data: {},
        error: StatusError,
      };
    });
};

export const getUserByEmail = (email: string): Promise<SearchUserResult> => {
  return User.findOne({ email })
    .exec()
    .then((result: IUser) => {
      if (!result) {
        return <SearchUserResult>{
          data: {},
          error: StatusAccountNotFound,
        };
      }

      return <SearchUserResult>{
        data: result,
        error: null,
      };
    })
    .catch((error) => {
      Logger.error('getUserByID', error.message);
      return <SearchUserResult>{
        data: {},
        error: StatusError,
      };
    });
};
