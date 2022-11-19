import mongoose, { Schema } from 'mongoose';
import IUserTokens from '../interfaces/user-tokens';

const UserTokensSchema: Schema = new Schema(
  {
    access: { type: String, required: true },
    refresh: { type: String, required: true },

    createdAt: { type: Date, default: new Date(), required: true },
    updatedAt: { type: Date, default: new Date(), required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUserTokens>('UserTokens', UserTokensSchema, 'user_tokens');
