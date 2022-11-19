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
      console.log('result1', result);
      return StatusSuccess;
    })
    .catch((error) => {
      console.log('error >>', error);
      return StatusError;
    });

  console.log('result', result);
  return StatusSuccess;
}

export async function getUserTokensByIDAndRefresh(id: string, refresh: string): Promise<boolean> {
  return await UserTokens.deleteOne({ _id: id, refresh })
    .then((result) => {
      console.log('resultx:', result);
      return result.deletedCount !== 0;
    })
    .catch((ERR) => {
      console.log('ERR:', ERR);
      return false;
    });
}
