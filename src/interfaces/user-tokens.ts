import { Document } from 'mongoose';

export default interface IUserTokens extends Document {
  access: string;
  refresh: string;
  createdAt: string;
  updatedAt: string;
}
