import { TypeEnv } from '../typedefs';
import express = require('express');

module.exports = (app: express.Application, env: TypeEnv) => {
  app.get('/', (req, res) => {
    res.send("<a href='/secret'>Access Secret Area</a>");
  });

  app.get('/login', (req, res) => {
    res.send("<a href='/auth/github'>Sign in With GitHub</a>");
  });
};
