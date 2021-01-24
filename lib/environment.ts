require('dotenv').config();

import { EnvConfig } from './typedefs';

const env: EnvConfig = {
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID || '',
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET || '',
};

export = env;
