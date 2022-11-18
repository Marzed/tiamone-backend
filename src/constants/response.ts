import { Response } from 'express';

const StatusSuccess = 'success',
  StatusError = 'error',
  StatusErrorBodyType = 'errorBodyType',
  StatusErrorBodyInvalid = 'errorBodyInvalid',
  StatusErrorQuery = 'errorQuery',
  StatusErrorParam = 'errorParam',
  StatusErrorInternal = 'errorInternal',
  StatusEmpty = 'empty',
  StatusAccessDenied = 'accessDenied',
  StatusTokenInvalid = 'tokenInvalid',
  // ACCOUNT
  StatusAccountExist = 'accountExist',
  StatusAccountNotFound = 'accountNotFound',
  StatusAccountBanned = 'accountBanned',
  StatusAccountNotActivated = 'accountNotActivated',
  // SERVER
  StatusUnknown = 'unknown';

export const Success = (res: Response) =>
  res.status(200).json({
    status: StatusSuccess,
  });

export const SuccessWithNumber = (res: Response, data: number) =>
  res.status(200).json({
    status: StatusSuccess,
    data: data,
  });

export const SuccessWithString = (res: Response, data: string) =>
  res.status(200).json({
    status: StatusSuccess,
    data: data,
  });

export const SuccessWithObject = (res: Response, data: object) =>
  res.status(200).json({
    status: StatusSuccess,
    data: data,
  });

export const SuccessWithArrayOfObjects = (res: Response, data: Array<object>) =>
  res.status(200).json({
    status: StatusSuccess,
    data: data,
  });

export const SuccessWithArrayOfNumbers = (res: Response, data: Array<number>) =>
  res.status(200).json({
    status: StatusSuccess,
    data: data,
  });

export const SuccessWithArrayOfStrings = (res: Response, data: Array<string>) =>
  res.status(200).json({
    status: StatusSuccess,
    data: data,
  });

export const Error = (res: Response) =>
  res.status(400).json({
    status: StatusError,
  });

export const Empty = (res: Response) =>
  res.status(200).json({
    status: StatusEmpty,
  });

export const AccessDenied = (res: Response) =>
  res.status(400).json({
    status: StatusAccessDenied,
  });

export const TokenInvalid = (res: Response) =>
  res.status(401).json({
    status: StatusTokenInvalid,
  });

export const ErrorQuery = (res: Response) =>
  res.status(400).json({
    status: StatusErrorQuery,
  });

export const ErrorParam = (res: Response) =>
  res.status(400).json({
    status: StatusErrorParam,
  });

export const ErrorBodyType = (res: Response) =>
  res.status(400).json({
    status: StatusErrorBodyType,
  });

export const ErrorBodyInvalid = (res: Response) =>
  res.status(400).json({
    status: StatusErrorBodyInvalid,
  });

export const ErrorInternal = (res: Response) =>
  res.status(500).json({
    status: StatusErrorInternal,
  });

// ACCOUNT

export const AccountExist = (res: Response) =>
  res.status(400).json({
    status: StatusAccountExist,
  });

export const AccountNotFound = (res: Response) =>
  res.status(400).json({
    status: StatusAccountNotFound,
  });

export const AccountBanned = (res: Response) =>
  res.status(400).json({
    status: StatusAccountBanned,
  });

export const AccountNotActivated = (res: Response) =>
  res.status(400).json({
    status: StatusAccountNotActivated,
  });

export const Unknown = (res: Response) =>
  res.status(404).json({
    status: StatusUnknown,
  });
