import { StatusError, StatusSuccess } from '../../../constants/response';
import User from '../../../models/user';
import Logger from '../../../logger/logger';

export async function updateUser(
  id: string,
  email: string,
  password: string
): Promise<typeof StatusSuccess | typeof StatusError> {
  const user = new User({
    _id: id,
    email,
    password,
  });

  return await user
    .updateOne(
      {
        $set: {
          email,
          password,
        },
      },
      { upsert: false }
    )
    .then((result) => {
      if (result.modifiedCount === 0) return StatusError;

      return StatusSuccess;
    })
    .catch((error) => {
      Logger.error('updateUser', error.message);
      return StatusError;
    });
}