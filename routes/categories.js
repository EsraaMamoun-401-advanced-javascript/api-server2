'use strict';

const express = require('express');
const router = express.Router();

const categorie = require('../models/categories/categories.collection.js');

router.get('/categories', getCategorie);
router.get('/categories/:id', getOneCategorie);
router.post('/categories', postCategorie);
router.put('/categories/:id', putCategorie);
router.delete('/categories/:id', deleteCategorie);

function getCategorie(req, res, next) {
  categorie.get()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(next);
}

function getOneCategorie(req, res, next) {
  categorie.get(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(next);
}

function postCategorie(req,res, next ) {
  categorie.post(req.body)
    .then(data => {
      res.status(201).json(data);
    }).catch(next);
}

function putCategorie(req,res, next ) {
  categorie.update(req.params.id, req.body)
    .then(data => res.status(200).json(data))
    .catch(next);
}

function deleteCategorie(req,res, next) {
  categorie.delete(req.params.id)
    .then(data => {
      res.status(200).json(data);
    }).catch(next);
}

module.exports = router;