process.env.ENV = 'Test';
const request = require('supertest');
const app = require('../index.js');
const async = require('async');

let testUser = {};
const testEmail = 'testuser' + Math.floor((Math.random() * 9999) + 1) + '@example.org';

describe('Authentication', () => {
  async.series([

    function createUser(next) {
      it('Register User', (done) => {
        request(app)
        .post('/register')
        .send({ email: testEmail, password: 'Unit Test' })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(201)
        .end( (err, res) => {
          testUser = res.body;
          done();
        });
      })
      next();
    },

    function createUserWithoutEmail(next) {
      it('Register User Without Email (Expect 422)', (done) => {
        request(app)
        .post('/register')
        .send({ password: 'Unit Test' })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(422, done);
      })
      next();
    },

    function createUserWithoutPassword(next) {
      it('Register User Without Password (Expect 422)', (done) => {
        request(app)
        .post('/register')
        .send({ email: testEmail })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(422, done);
      })
      next();
    },

    function userAlreadyExsists(next) {
      it('Register User That Already Exsists (Expect 422)', (done) => {
        request(app)
        .post('/register')
        .send({ email: testEmail, password: 'Unit Test' })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(422, done)
      })
      next();
    },

    function login(next) {
      it('Login As A User', (done) => {
        request(app)
        .post('/login')
        .send({ email: testEmail, password: 'Unit Test' })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, done);
      })
      next();
    },

  ]);
});
