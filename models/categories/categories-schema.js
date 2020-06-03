'use strict';

const mongoose = require('mongoose');

const categorie = mongoose.Schema({
  name: { type: String, required: true },
  display_name: { type: String, required: false },
  description: { type: String, required: false },
});

const categorieSchema = mongoose.model('categorie', categorie);

module.exports = categorieSchema;