'use strict';

const Model = require('../model.js');
const schema = require('./products-schema.js');

class Product extends Model {
  constructor() {
    super(schema);
  }
}

module.exports = new Product();