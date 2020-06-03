'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const categorieRouter = require('../routes/categories.js');
const productRouter = require('../routes/product.js');

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));


const timestamp = require('../middleware/timestamp.js');
const logger = require('../middleware/logger.js');
const notFound = require('../middleware/404.js');
const errorServer = require('../middleware/500.js');

app.use(timestamp);
app.use(logger);

app.use(categorieRouter);
app.use(productRouter);


//------------Not Found & Error------------//

app.use('*', notFound);
app.use(errorServer);

// -------Start Server (Listining)------- //

const startServer = (port) => {
  // Check if the server already running, also, if the port is valid
  // then call callback anon function when server successfully running...

  app.listen(port, () => {
    console.log(`My server is up and running on ${port}`);
  });
};

module.exports = {
  server: app,
  start: startServer,
};