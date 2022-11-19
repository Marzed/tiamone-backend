import { Request, Response } from 'express';
import * as send from '../constants/response';
import {
  StatusAccountExist,
  StatusAccountNotFound,
  StatusError,
  StatusSuccess,
} from '../constants/response';
import { IsValidObjectId } from '../helper/validate';
import { WorkflowClient } from '@temporalio/client';
import {
  DeleteUserByID,
  GetAllUsers,
  GetUserById,
  NewUser,
  UpdateUser,
} from '../temporal/workflows/workflows';
import { GenerateWorkflowId } from '../helper/transactionID';
import { config } from '../config/config';
const argon2 = require('argon2');

const createUser = async (req: Request, res: Response) => {
  let { email, password } = req.body;
  //TODO validate

  const hash = await argon2.hash(password, {
    saltLength: config.password.saltLength,
    hashLength: config.password.hashLength,
  });

  const client = new WorkflowClient();
  const handle = await client.start(NewUser, {
    workflowId: GenerateWorkflowId('register-user'),
    taskQueue: config.taskQueue.dev,
    args: [email, hash],
  });
  const result = await handle.result();

  switch (result) {
    case StatusSuccess:
      send.Success(res);
      return;
    case StatusAccountExist:
      send.AccountExist(res);
      return;
    default:
      send.Error(res);
      return;
  }
};

const updateUser = async (req: Request, res: Response) => {
  let { id, email, password } = req.body;

  const client = new WorkflowClient();
  const handle = await client.start(UpdateUser, {
    workflowId: GenerateWorkflowId(`update-user-${id}`),
    taskQueue: config.taskQueue.dev,
    args: [id, email, password],
  });
  const result = await handle.result();

  switch (result) {
    case StatusSuccess:
      send.Success(res);
      return;
    case StatusAccountExist:
      send.AccountExist(res);
      return;
    default:
      send.Error(res);
      return;
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  const client = new WorkflowClient();
  const handle = await client.start(GetAllUsers, {
    workflowId: GenerateWorkflowId(`workflow`),
    taskQueue: config.taskQueue.dev,
    args: [],
  });
  const result = await handle.result();
  if (result.error) {
    send.Error(res);
    return;
  }

  send.SuccessWithArrayOfObjects(res, result.data);
  return;
};

const getUserByID = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!IsValidObjectId(id)) {
    send.ErrorParam(res);
    return;
  }

  const client = new WorkflowClient();
  const handle = await client.start(GetUserById, {
    workflowId: GenerateWorkflowId(`workflow`),
    taskQueue: config.taskQueue.dev,
    args: [id],
  });

  const result = await handle.result();
  if (result.error) {
    switch (result.error) {
      case StatusAccountNotFound:
        send.AccountNotFound(res);
        return;
      case StatusError:
        send.Error(res);
        return;
      default:
        break;
    }
  }

  send.SuccessWithObject(res, result.data);
  return;
};

const deleteUserByID = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!IsValidObjectId(id)) {
    send.ErrorParam(res);
    return;
  }

  const client = new WorkflowClient();
  const handle = await client.start(DeleteUserByID, {
    workflowId: GenerateWorkflowId('register-user'),
    taskQueue: config.taskQueue.dev,
    args: [id],
  });
  const result = await handle.result();

  switch (result) {
    case StatusSuccess:
      send.Success(res);
      return;
    case StatusAccountNotFound:
      send.AccountNotFound(res);
      return;
    default:
      send.Error(res);
      return;
  }
};

export default { getAllUsers, createUser, updateUser, getUserByID, deleteUserByID };
