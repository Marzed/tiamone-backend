import { proxyActivities } from '@temporalio/workflow';
import type * as activities from '../activities/activities';
import { StatusAccountNotFound, StatusError, StatusSuccess } from '../../constants/response';

const { createUser, updateUser, getAllUsers, getUserById, deleteUserById } = proxyActivities<
  typeof activities
>({
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
