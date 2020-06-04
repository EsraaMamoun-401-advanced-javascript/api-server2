'use strict';

require('dotenv').config();

const mongoose = require('mongoose');

const server = require('./lib/server.js');

let port = process.env.PORT || 4000;

server.start(port);

const mongooseOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

mongoose.connect(process.env.MONGODB_URI, mongooseOptions);