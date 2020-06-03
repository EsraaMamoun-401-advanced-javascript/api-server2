'use strict';

const {server} = require('../lib/server.js');  // We can use also: // const serverMod = require('../lib/server'); // const server = serverMod.server;
const supertest = require('supertest'); 
const mockRequest = supertest(server);

describe('web server', () => {
  it('should respond with 500', ()=> {
        
    return mockRequest.get('/bad')
      .then(results=> {
        expect(results.status).toBe(500);
      }).catch(console.error);
  });

  it('should respond 404 of an invalid route',() => {

    return mockRequest
      .get('/invalidroute')
      .then(results => {
        expect(results.status).toBe(404);
      }).catch(console.log);
  });

  it('should respond properly / (Home page)', ()=> {
    return mockRequest
      .get('/?name=esraa')
      .then(results => {
        expect(results.status).toBe(200);
      });
  });

  let routs = ['products', 'categories'];

  routs.forEach((rout) => {
    it(`should post ${rout} data`, ()=> {
      return mockRequest
        .post(`/${rout}`)
        .send({name: 'test name'})
        .then(results => {
          expect(results.status).toBe(201);
        });
    });
    
    it(`should get ${rout} data`, ()=> {
      return mockRequest
        .get(`/${rout}`)
        .then(results => {
          expect(results.status).toBe(200);
        });
    });
    
    it(`should get ${rout} data by Id`, ()=> {
      return mockRequest
        .get(`/${rout}/1`)
        .then(results => {
          expect(results.status).toBe(200);
        });
    });
    
    it(`should put ${rout} data with Id`, ()=> {
      return mockRequest
        .put(`/${rout}/1`)
        .then(results => {
          expect(results.status).toBe(200);
        });
    });

    it(`should patch ${rout} data with Id`, ()=> {
      return mockRequest
        .patch(`/${rout}/1`)
        .then(results => {
          expect(results.status).toBe(200);
        });
    });

    it(`should delete ${rout} data with Id`, ()=> {
      return mockRequest
        .delete(`/${rout}/1`)
        .then(results => {
          expect(results.status).toBe(200);
        });
    });
  });
  
});