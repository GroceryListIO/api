process.env.ENV = 'Test';
const request = require('supertest');
const app = require('../index.js');

describe('GET /lists - Get All Lists', () => {
  it('Status code 200', (done) => {
    request(app).get('/lists').expect(200, done)
  });
  it('Content-Type json', (done) => {
    request(app).get('/lists').expect('Content-Type', 'application/json; charset=utf-8', done);
  });
});
