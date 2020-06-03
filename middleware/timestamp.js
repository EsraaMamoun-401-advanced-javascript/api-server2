'use strict';

// Save new Date() then make it as local time
// So that I can use it in logger

const timestamp = (req, res, next) => {
  var newDate = new Date();
  req.time = newDate.toLocaleString();
  next();
};

module.exports = timestamp;