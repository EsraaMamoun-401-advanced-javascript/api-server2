'use strict';

const {server} = require('../lib/server.js');  // We can use also: // const serverMod = require('../lib/server'); // const server = serverMod.server;
const supertest = require('supertest'); 
const mockRequest = supertest(server);
const timestamp = require('../middleware/timestamp');
let req = {};
let res = {};
let next = jest.fn();

describe('web server', () => {

  it('timestamp', () => {
    timestamp(req, res, next);
    expect(req.requestTime).toBeUndefined();
  });

  it('moved to next', () => {
    timestamp(req, res, next);
    expect(next).toHaveBeenCalled();
  });


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

});