import User from '../../../models/user';
import Logger from '../../../logger/logger';
import { StatusError } from '../../../constants/response';

export interface IUserItemModel {
  id: string;
  email: string;
  createdAt: string;
}

export interface SearchResult {
  data: Array<IUserItemModel>;
  error: typeof StatusError | null;
}

export async function getAllUsers(): Promise<SearchResult> {
  return User.find()
    .exec()
    .then((results) => {
      const data: Array<IUserItemModel> = results.map((value) => {
        let item: IUserItemModel = {
          id: value.id,
          email: value.email,
          createdAt: value.createdAt,
        };
        return item;
      });
      return <SearchResult>{
        data,
        error: null,
      };
    })
    .catch((error) => {
      Logger.error('getAllUsers', error.message);
      return <SearchResult>{
        data: [],
        error: StatusError,
      };
    });
}
