const request = require('supertest');
const app = require('../index.js');

describe('Health Check', () => {
  it('Should be status code 200', (done) => {
    request(app).get('/health').expect(200, done);
  });
});
