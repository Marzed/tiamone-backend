import dotenv from 'dotenv';

dotenv.config();

const SERVER_PORT: number = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 25000;

const MONGO_USERNAME: string = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD: string = process.env.MONGO_PASSWORD || '';
const MONGO_HOST: string = process.env.MONGO_HOST || 'localhost';
const MONGO_PORT: string = process.env.MONGO_PORT || '28019';
const MONGO_DBNAME: string = process.env.MONGO_DBNAME || 'tiamone';
const MONGO_URL: string = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DBNAME}`;
const MONGO_QUERY: string = '?directConnection=true';

// ROLES
const ROLE_USER = 'User';
const ROLE_MODERATOR = 'Moderator';
const ROLE_ADMIN = 'Admin';

// PASSWORD
const saltLength: number = 64;
const hashLength: number = 64;

// JWT
const JWT_SECRET: string = process.env.JWT_SECRET || '';
const JWT_LIFETIME_ACCESS_MINUTE: number = Number(process.env.JWT_LIFETIME_ACCESS_MINUTE) || 5; // minute
const JWT_LIFETIME_REFRESH_DAY: number = Number(process.env.JWT_LIFETIME_REFRESH_DAY) || 30; // days

export const config = {
  mongo: {
    url: MONGO_URL + MONGO_QUERY,
  },
  server: {
    port: SERVER_PORT,
  },
  taskQueue: {
    dev: 'dev-queue',
  },
  password: {
    saltLength,
    hashLength,
  },
  jwt: {
    secret: JWT_SECRET,
    lifetimeAccess: JWT_LIFETIME_ACCESS_MINUTE,
    lifetimeRefresh: JWT_LIFETIME_REFRESH_DAY,
  },
  role: {
    user: ROLE_USER,
    moderator: ROLE_MODERATOR,
    admin: ROLE_ADMIN,
  },
};
