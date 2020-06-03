'use strict';

require('dotenv').config();

const mongoose = require('mongoose');

const server = require('./lib/server.js');

const MONGODB_URI = 'mongodb://localhost:27017/class-08-db';

let port = process.env.PORT || 4000;

server.start(port);

const mongooseOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

mongoose.connect(MONGODB_URI, mongooseOptions);