process.env.ENV = 'Test';
const request = require('supertest');
const app = require('../index.js');

describe('Lists', () => {

  it('GET /lists - Get All Lists', (done) => {
    request(app)
    .get('/lists')
    .expect(200)
    .expect('Content-Type', 'application/json; charset=utf-8', done);
  });

  it('POST /lists - Create A List', (done) => {
    request(app)
    .post('/lists')
    .send({ name: 'Test POST' })
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(200, done);
  });

});
