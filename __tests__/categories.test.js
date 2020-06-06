'use strict';

const express = require('express');
const server = express();
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);
const route = require('../routes/categories.js');
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use('/', route);


describe('categories and products', () => {

  let theId = null;
  it('get /categories', () => {
    return mockRequest
      .get('/categories')
      .then(results => {
        expect(results.status).toBe(200);
      });
  });

  it('post /categories', () => {
    let testObj = { 'name': 'test', description: 'test' };
    return mockRequest
      .post('/categories')
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
      .get(`/categories/${theId}`)
      .then(results => {
        expect(results.status).toBe(200);
      });
  });

  it('put /categories/:id', () => {
    let testObj = { 'name': 'test', description: 'test' };
    return mockRequest
      .put(`/categories/${theId}`, testObj)
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
      .delete(`/categories/${theId}`)
      .then(results => {
        expect(results.status).toBe(200);
      });
  });

});