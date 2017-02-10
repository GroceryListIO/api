const request = require('supertest');
const app = require('../index.js');

describe('Health Check', function() {
  it('Should be status code 200', function(done) {
    request(app).get('/health').expect(200,done)
  });
});
