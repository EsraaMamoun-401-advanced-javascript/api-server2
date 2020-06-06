'use strict';

const Model = require('../model.js');
const categoriesSchema = require('./categories-schema.js');

class Categorie extends Model {
  constructor(schema) {
    super(schema);
  }
}

module.exports = new Categorie(categoriesSchema);