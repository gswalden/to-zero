'use strict';

process.env.NODE_ENV = 'test';

const should = require('chai').should()
  , toZero = require('../')
  ;

describe('to-zero tests', () => {
  it('should countdown one second', done => {
    toZero('1s', done);
  });

  it('invalid time string should throw', () => {
    () => { toZero('zzz') }.should.throw;
  });
});
