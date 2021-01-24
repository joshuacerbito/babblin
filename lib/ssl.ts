const fs = require('fs');
const key = fs.readFileSync('./ssl/key.pem');
const cert = fs.readFileSync('./ssl/cert.pem');

export = { key, cert };
