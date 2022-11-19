import User from '../../../models/user';
import { Types } from 'mongoose';
import { StatusAccountNotFound, StatusError } from '../../../constants/response';
import { IUserItemModel } from './get-all';
import Logger from '../../../logger/logger';

export interface SearchUserResult {
  data: IUserItemModel;
  error: typeof StatusError | typeof StatusAccountNotFound | null;
}

export const getUserById = (id: string): Promise<SearchUserResult> => {
  return User.findById(new Types.ObjectId(id))
    .exec()
    .then((result) => {
      if (!result) {
        return <SearchUserResult>{
          data: {},
          error: StatusAccountNotFound,
        };
      }
      const data: IUserItemModel = {
        id: result.id,
        email: result.email,
        createdAt: result.createdAt,
      };
      return <SearchUserResult>{
        data,
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
