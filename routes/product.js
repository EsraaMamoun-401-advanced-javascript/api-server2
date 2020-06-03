'use strict';

const express = require('express');
const router = express.Router();

const product = require('../models/products/products-collection.js');

router.get('/products', getProduct);
router.get('/products/:id', getOneProduct);
router.post('/products', postProduct);
router.put('/products/:id', putProduct);
router.delete('/products/:id', deleteProduct);

function getProduct(req, res, next) {
  product.get()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(next);
}

function getOneProduct(req, res, next) {
  product.get(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(next);
}

function postProduct(req, res, next) {
  product.post(req.body)
    .then(data => {
      res.status(201).json(data);
    }).catch(next);
}

function putProduct(req, res, next) {
  product.update(req.params.id, req.body)
    .then(data => res.status(200).json(data))
    .catch(next);
}

function deleteProduct(req, res, next) {
  product.delete(req.params.id)
    .then(data => {
      res.status(200).json(data);
    }).catch(next);
}

module.exports = router;