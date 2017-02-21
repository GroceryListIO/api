process.env.ENV = 'Test';
const request = require('supertest');
const app = require('../index.js');
const async = require('async');

let testList = {};
let testUser = {};
const testEmail = 'testuser' + Math.floor((Math.random() * 9999) + 1) + '@example.org';

describe('Lists', () => {
  async.series([

    function createUser(next) {
      it('Create A User To Test With', (done) => {
        request(app)
        .post('/register')
        .send({ email: testEmail, password: 'Unit Test' })
        .end( (err, res) => {
          testUser = res.body;
          done();
        });
      })
      next();
    },

    function createList(next) {
      it('Create A List', (done) => {
        request(app)
        .post('/lists')
        .set('Authorization', testUser.token)
        .send({ name: 'Test POST', description: 'Unit Test' })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .end( (err, res) => {
          testList = res.body;
          done();
        });
      })
      next();
    },

    function getAllLists(next) {
      it('Get All Lists', (done) => {
        request(app)
        .get('/lists')
        .set('Authorization', testUser.token)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, done);
      })
      next();
    },

    function getList(next) {
      it('Get Single List', (done) => {
        request(app)
        .get('/lists/' + testList._id)
        .set('Authorization', testUser.token)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, done);
      })
      next();
    },

    function deleteList(next) {
      it('Delete List', (done) => {
        request(app)
        .del('/lists/' + testList._id)
        .set('Authorization', testUser.token)
        .expect(200, done);
      })
      next();
    },

  ]);
});
