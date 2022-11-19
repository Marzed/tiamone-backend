import { config } from '../../../config/config';
const jwt = require('jsonwebtoken');

export const checkRefreshToken = async (token: string): Promise<string | null> => {
  if (!token) return null;
  const decoded = jwt.verify(token, config.jwt.secret);
  if (decoded.error) return null;
  if (decoded.tokenType !== 'refresh') return null;
  return decoded.id;
};
