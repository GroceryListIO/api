process.env.ENV = 'Test';
const request = require('supertest');
const app = require('../index.js');

describe('GET /health - Health Check', () => {
  it('Status code 200', (done) => {
    request(app).get('/health').expect(200, done)
  });
  it('Content-Type json', (done) => {
    request(app).get('/health').expect('Content-Type', 'application/json; charset=utf-8', done);
  });
  it('Returns {STATUS: UP}', (done) => {
    request(app).get('/health').expect({STATUS: 'UP'}, done);
  });
});
