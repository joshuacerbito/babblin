// Load dependencies
require('./lib/typedefs');
import express = require('express');
import ssl = require('./lib/ssl');
const https = require('https');

// Create a new express application instance
const app: express.Application = express();
const { key, cert } = ssl;
const server = https.createServer({ key, cert }, app);

// Load environment variables
import env = require('./lib/environment');

// Setup routes
require('./lib/routes')(app, env);

// Add server console logs/tests
require('./lib/console')(server);
