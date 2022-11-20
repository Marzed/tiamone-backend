import { StatusError, StatusSuccess } from '../../../constants/response';
import UserTokens from '../../../models/user-tokens';
import { Token } from '../../../helper/jwt-tokens';

export async function updateUserTokens(
  id: string,
  access: Token,
  refresh: Token
): Promise<typeof StatusSuccess | typeof StatusError> {
  const result = await UserTokens.findOneAndUpdate(
    { _id: id },
    {
      access,
      refresh,
    },
    { upsert: true }
  )
    .then((result) => {
      return StatusSuccess;
    })
    .catch((error) => {
      return StatusError;
    });
  return StatusSuccess;
}

export async function getUserTokensByIDAndRefresh(id: string, refresh: string): Promise<boolean> {
  return await UserTokens.deleteOne({ _id: id, refresh })
    .then((result) => {
      return result.deletedCount !== 0;
    })
    .catch((ERR) => {
      return false;
    });
}
