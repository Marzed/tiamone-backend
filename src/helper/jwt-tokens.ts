import { config } from '../config/config';
const jwt = require('jsonwebtoken');

export interface Token {
  id: string;
  role: string;
  tokenType: string;
  expiresIn?: string;
}

export interface IGenerateTokens {
  access: Token;
  refresh: Token;
}

export const GenerateTokens = (id: string, role: string): IGenerateTokens => {
  const access: Token = {
    id,
    role,
    tokenType: 'access',
  };

  const refresh: Token = {
    id,
    role,
    tokenType: 'refresh',
  };

  const AccessToken: Token = jwt.sign(access, config.jwt.secret, {
    expiresIn: `${config.jwt.lifetimeAccess}m`,
  });
  const RefreshToken: Token = jwt.sign(refresh, config.jwt.secret, {
    expiresIn: `${config.jwt.lifetimeRefresh}d`,
  });

  return <IGenerateTokens>{
    access: AccessToken,
    refresh: RefreshToken,
  };
};
