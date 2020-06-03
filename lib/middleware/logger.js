'use strict';

const logger = (req, res, next) => {
  console.log('__REQUEST__', req.method, req.path, 'at', req.time);
  next();
};

module.exports = logger;