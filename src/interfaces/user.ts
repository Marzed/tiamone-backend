import { Document } from 'mongoose';

export default interface IUser extends Document {
  email: string;
  password: string;
  role: string;
  isBanned: boolean;
  isActivated: boolean;
  lastLogin: Date;
  createdAt: string;
  updatedAt: string;
}
