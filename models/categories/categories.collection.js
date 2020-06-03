'use strict';

const Model = require('../model.js');
const schema = require('./categories-schema.js');

class Categorie extends Model {
  constructor() {
    super(schema);
  }
}

module.exports = new Categorie();