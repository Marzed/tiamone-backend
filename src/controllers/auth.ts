import { Request, Response } from 'express';

import { config } from '../config/config';
import { WorkflowClient } from '@temporalio/client';
import { AuthSignIn, wfReAuthWithRefreshToken } from '../temporal/workflows/workflows';
import { GenerateWorkflowId } from '../helper/transactionID';
import {
  StatusAccountBanned,
  StatusAccountExist,
  StatusAccountNotActivated,
  StatusAccountNotFound,
  StatusError,
  StatusErrorBodyInvalid,
  StatusSuccess,
  StatusTokenInvalid,
} from '../constants/response';
import * as send from '../constants/response';

const SignIn = async (req: Request, res: Response) => {
  let { email, password } = req.body;
  if (!email || !password) {
    send.ErrorBodyInvalid(res);
    return;
  }

  // TODO validate

  const client = new WorkflowClient();
  const handle = await client.start(AuthSignIn, {
    workflowId: GenerateWorkflowId('register-user'),
    taskQueue: config.taskQueue.dev,
    args: [email, password],
  });
  const result = await handle.result();

  if (result.error) {
    switch (result.error) {
      case StatusAccountBanned:
        send.AccountBanned(res);
        return;
      case StatusAccountNotFound:
        send.AccountNotFound(res);
        return;
      case StatusAccountNotActivated:
        send.AccountNotActivated(res);
        return;
      case StatusErrorBodyInvalid:
        send.ErrorBodyInvalid(res);
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

const ReAuthWithRefreshToken = async (req: Request, res: Response) => {
  const { token } = req.query;
  if (!token) {
    send.TokenInvalid(res);
    return;
  }
  // TODO validate

  const client = new WorkflowClient();
  const handle = await client.start(wfReAuthWithRefreshToken, {
    workflowId: GenerateWorkflowId('ReAuthWithRefresh'),
    taskQueue: config.taskQueue.dev,
    args: [String(token)],
  });

  const result = await handle.result();

  if (result.error) {
    switch (result.error) {
      case StatusAccountBanned:
        send.AccountBanned(res);
        return;
      case StatusTokenInvalid:
        send.TokenInvalid(res);
        return;
      case StatusAccountNotFound:
        send.AccountNotFound(res);
        return;
      case StatusAccountNotActivated:
        send.AccountNotActivated(res);
        return;
      case StatusErrorBodyInvalid:
        send.ErrorBodyInvalid(res);
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

export default { SignIn, ReAuthWithRefreshToken };
