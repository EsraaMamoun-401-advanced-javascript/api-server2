'use strict';

const express = require('express');
const server = express();
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);
const route = require('../routes/product.js');
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use('/', route);


describe('products and products', () => {

  let theId = null;
  it('get /products', () => {
    return mockRequest
      .get('/products')
      .then(results => {
        expect(results.status).toBe(200);
      });
  });

  it('post /products', () => {
    let testObj = { 'category': 'test', 'name': 'test', description: 'test' };
    return mockRequest
      .post('/products')
      .send(testObj)
      .then(results => {
        theId = results.body._id;
        expect(results.status).toBe(201);
        Object.keys(testObj).forEach(key => {
          expect(results.body[key]).toEqual(testObj[key]);
        });
      });
  });

  it('get /products/:id', () => {
    return mockRequest
      .get(`/products/${theId}`)
      .then(results => {
        expect(results.status).toBe(200);
      });
  });

  it('put /products/:id', () => {
    let testObj = { 'category': 'test', 'name': 'test', description: 'test' };
    return mockRequest
      .put(`/products/${theId}`, testObj)
      .send(testObj)
      .then(results => {
        expect(results.status).toBe(200);
        Object.keys(testObj).forEach(key => {
          expect(results.body[key]).toEqual(testObj[key]);
        });
      });
  });

  it('delete /products/:id', () => {
    return mockRequest
      .delete(`/products/${theId}`)
      .then(results => {
        expect(results.status).toBe(200);
      });
  });

});