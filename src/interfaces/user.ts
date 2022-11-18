import { Document } from 'mongoose';

export default interface IUser extends Document {
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}
