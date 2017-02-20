process.env.ENV = 'Test';
const request = require('supertest');
const app = require('../index.js');
const async = require('async');

let testUser = {};
const testEmail = 'testuser' + Math.floor((Math.random() * 9999) + 1) + '@example.org';

describe('Authentication', () => {
  async.series([

    function createUser(asyncDone) {
      it('POST /register - Create A User', (done) => {
        request(app)
        .post('/register')
        .send({ email: testEmail, password: 'Unit Test' })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(201)
        .end( (err, res) => {
          if (err) throw err;
          testUser = res.body;
          done();
        });
      })
      asyncDone();
    },

    function login(asyncDone) {
      it('POST /login - Login As A User', (done) => {
        request(app)
        .post('/login')
        .send({ email: testEmail, password: 'Unit Test' })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, done);
      })
      asyncDone();
    },

  ]);
});
