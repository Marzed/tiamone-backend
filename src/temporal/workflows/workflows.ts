import { proxyActivities } from '@temporalio/workflow';

import type * as activities from '../activities/activities';
import {
  StatusAccountBanned,
  StatusAccountNotActivated,
  StatusAccountNotFound,
  StatusError,
  StatusErrorBodyInvalid,
  StatusSuccess,
  StatusTokenInvalid,
} from '../../constants/response';
import { Token } from '../../helper/jwt-tokens';

const {
  createUser,
  updateUser,
  getAllUsers,
  getUserById,
  deleteUserById,
  getUserByEmail,
  verifyPassword,
  generateTokens,
  updateUserTokens,
  updateUserLastLogin,
  checkRefreshToken,
  getUserTokensByIDAndRefresh,
} = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});

export async function NewUser(email: string, password: string): Promise<string> {
  return await createUser(email, password);
}

export async function UpdateUser(id: string, email: string, password: string): Promise<string> {
  return await updateUser(id, email, password);
}

export async function GetAllUsers(): Promise<activities.SearchResult> {
  return await getAllUsers();
}

export async function GetUserById(id: string): Promise<activities.SearchUserResult> {
  return await getUserById(id);
}

export async function DeleteUserByID(
  id: string
): Promise<typeof StatusSuccess | typeof StatusError | typeof StatusAccountNotFound> {
  return await deleteUserById(id);
}

interface UserInfo {
  email: string;
  role: string;
  accessToken: Token;
  refreshToken: Token;
}

interface IAuthSignIn {
  data: UserInfo;
  error:
    | typeof StatusError
    | typeof StatusAccountNotFound
    | typeof StatusAccountBanned
    | typeof StatusAccountNotActivated
    | typeof StatusErrorBodyInvalid
    | typeof StatusTokenInvalid
    | null;
}

export async function AuthSignIn(email: string, password: string): Promise<IAuthSignIn> {
  const user = await getUserByEmail(email);
  if (user.error) return <IAuthSignIn>{ error: user.error };
  const isValid = await verifyPassword(user.data.password, password);
  if (!isValid) return <IAuthSignIn>{ error: StatusErrorBodyInvalid };
  const tokens = await generateTokens(user.data._id, user.data.role);
  const lastLogin = await updateUserLastLogin(user.data._id);
  if (!lastLogin) return <IAuthSignIn>{ error: StatusError };
  const status = await updateUserTokens(user.data._id, tokens.access, tokens.refresh);
  switch (status) {
    case StatusSuccess:
      return <IAuthSignIn>{
        data: {
          email: user.data.email,
          role: user.data.role,
          accessToken: tokens.access,
          refreshToken: tokens.refresh,
          isBanned: user.data.isBanned,
          isActivated: user.data.isActivated,
        },
        error: null,
      };
    default:
      return <IAuthSignIn>{ error: StatusError };
  }
}

export async function wfReAuthWithRefreshToken(token: string): Promise<IAuthSignIn> {
  const userID = await checkRefreshToken(token);
  if (!userID) return <IAuthSignIn>{ error: StatusTokenInvalid };
  const isFoundAndDeleted = await getUserTokensByIDAndRefresh(userID, token);
  console.log('isFoundAndDeleted', isFoundAndDeleted);
  console.log('token', token);
  console.log('userID', userID);
  if (!isFoundAndDeleted) return <IAuthSignIn>{ error: StatusTokenInvalid };
  if (!userID) return <IAuthSignIn>{ error: StatusTokenInvalid };

  const user = await getUserById(userID);
  if (user.error) return <IAuthSignIn>{ error: user.error };
  const tokens = await generateTokens(user.data._id, user.data.role);
  const lastLogin = await updateUserLastLogin(user.data._id);
  if (!lastLogin) return <IAuthSignIn>{ error: StatusError };
  const status = await updateUserTokens(user.data._id, tokens.access, tokens.refresh);
  switch (status) {
    case StatusSuccess:
      return <IAuthSignIn>{
        data: {
          email: user.data.email,
          role: user.data.role,
          accessToken: tokens.access,
          refreshToken: tokens.refresh,
          isBanned: user.data.isBanned,
          isActivated: user.data.isActivated,
        },
        error: null,
      };
    default:
      return <IAuthSignIn>{ error: StatusError };
  }
}
