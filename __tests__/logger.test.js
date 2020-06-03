'use strict';

const loggerMiddleWare = require('../lib/middleware/logger.js');

describe('logger middleware module', () => {
  let consoleSpy;
  let req = {};
  let res = {};
  let next = jest.fn();

  beforeEach(()=> {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(()=> {
    consoleSpy.mockRestore();
  });

  it ('log some output .. ', ()=> {
    loggerMiddleWare(req, res, next);
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('moved to next .. ', ()=> {
    loggerMiddleWare(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});