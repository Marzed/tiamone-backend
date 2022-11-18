import { Request, Response } from 'express';

export const AuthSignUp = (req: Request, res: Response) => {
  res.send({ status: 'success' });
  return;
};
