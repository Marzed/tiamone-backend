import mongoose, { Schema } from 'mongoose';
import IUser from '../interfaces/user';
import { config } from '../config/config';

const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: config.role.user },
    lastLogin: { type: Date, required: true, default: new Date() },
    isBanned: { type: Boolean, required: true, default: false },
    isActivated: { type: Boolean, required: true, default: true }, // TODO email verify

    createdAt: { type: Date, default: new Date(), required: true },
    updatedAt: { type: Date, default: new Date(), required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>('User', UserSchema, 'users');
