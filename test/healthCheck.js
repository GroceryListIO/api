process.env.ENV = 'Test';
const request = require('supertest');
const app = require('../index.js');

describe('Health Check', () => {

  it('GET /health - Get Health Check', (done) => {
    request(app)
    .get('/health')
    .expect(200)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect({STATUS: 'UP'}, done);
  });

});
