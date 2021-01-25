import { TypeEnv } from './typedefs';
require('dotenv').config();

const env: TypeEnv = {
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID || '',
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET || ''
};

export = env;
