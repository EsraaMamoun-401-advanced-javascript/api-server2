'use strict';

const mongoose = require('mongoose');

const product = mongoose.Schema({
  category: { type: String, required: true },
  name: { type: String, required: true },
  display_name: { type: String, required: false },
  description: { type: String, required: false },
});

const productSchema = mongoose.model('product', product);

module.exports = productSchema;