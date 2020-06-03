'use strict';

require('dotenv').config();

const server = require('./lib/server.js');

let port = process.env.PORT || 4000;

server.start(port);