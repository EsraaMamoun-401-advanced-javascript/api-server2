'use strict';

const express = require('express');
const server = express();
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);
const route = require('../routes/v1.js');
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use('/api/v1', route);


describe('categories and products', () => {

  let theId = null;
  it('get /categories', () => {
    return mockRequest
      .get('/api/v1/categories')
      .then(results => {
        expect(results.status).toBe(200);
      });
  });

  it('post /categories', () => {
    let testObj = { 'name': 'test', description: 'test' };
    return mockRequest
      .post('/api/v1/categories')
      .send(testObj)
      .then(results => {
        theId = results.body._id;
        expect(results.status).toBe(201);
        Object.keys(testObj).forEach(key => {
          expect(results.body[key]).toEqual(testObj[key]);
        });
      });
  });

  it('get /categories/:id', () => {
    return mockRequest
      .get(`/api/v1/categories/${theId}`)
      .then(results => {
        expect(results.status).toBe(200);
      });
  });

  it('put /categories/:id', () => {
    let testObj = { 'name': 'test', description: 'test' };
    return mockRequest
      .put(`/api/v1/categories/${theId}`, testObj)
      .send(testObj)
      .then(results => {
        expect(results.status).toBe(200);
        Object.keys(testObj).forEach(key => {
          expect(results.body[key]).toEqual(testObj[key]);
        });
      });
  });

  it('delete /categories/:id', () => {
    return mockRequest
      .delete(`/api/v1/categories/${theId}`)
      .then(results => {
        expect(results.status).toBe(200);
      });
  });

  it('get /products', () => {
    return mockRequest
      .get('/api/v1/products')
      .then(results => {
        expect(results.status).toBe(200);
      });

  });

  
  it('get /wrong', () => {
    return mockRequest
      .get('/api/v1/wrong')
      .then(results => {
        expect(results.status).toBe(500);
      });
  });

});


