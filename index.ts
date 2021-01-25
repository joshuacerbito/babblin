// Load dependencies
import { Server } from 'https';
import { Application } from 'express';
import express = require('express');
import ssl = require('./lib/ssl');
const https = require('https');

// Create a new express application instance
const app: Application = express();
const { key, cert } = ssl;
const server: Server = https.createServer({ key, cert }, app);

// Load environment variables
import env = require('./lib/environment');

// Setup routes
require('./lib/routes/web')(app, env);
require('./lib/routes/auth')(app, env);

// Add server console logs/tests
require('./lib/console')(server);
