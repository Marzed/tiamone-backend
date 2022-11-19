import argon2 from 'argon2';
import { GenerateTokens, IGenerateTokens } from '../../../helper/jwt-tokens';

export const verifyPassword = async (hash: string, password: string): Promise<boolean> => {
  return await argon2.verify(hash, password);
};

export const generateTokens = async (id: string, role: string): Promise<IGenerateTokens> => {
  return GenerateTokens(id, role);
};
