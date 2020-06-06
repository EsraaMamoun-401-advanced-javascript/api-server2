'use strict';

const Model = require('../model.js');
const productsSchema = require('./products-schema.js');

class Product extends Model {
  constructor(schema) {
    super(schema);
  }
}

module.exports = new Product(productsSchema);