process.env.ENV = 'Test';
const request = require('supertest');
const app = require('../index.js');
const async = require('async');

let testItem = {};
let testList = {};
let testUser = {};
const testEmail = 'testuser' + Math.floor((Math.random() * 9999) + 1) + '@example.org';

describe('Items', () => {
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
      it('Create A List To Test With', (done) => {
        request(app)
        .post('/lists')
        .set('Authorization', testUser.token)
        .send({ name: 'Test List Items', description: 'Unit Test' })
        .end( (err, res) => {
          testList = res.body;
          done();
        });
      })
      next();
    },

    function createAnItem(next) {
      it('Create Test Item', (done) => {
        request(app)
        .post('/lists/' + testList._id + '/items')
        .set('Authorization', testUser.token)
        .send({ name: 'Test Item' })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .end( (err, res) => {
          testItem = res.body;
          done();
        });
      })
      next();
    },

    function getAllItems(next) {
      it('Get All Items', (done) => {
        request(app)
        .get('/lists/' + testList._id + '/items/')
        .set('Authorization', testUser.token)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, done);
      })
      next();
    },

    function getItem(next) {
      it('Get Single Item', (done) => {
        request(app)
        .get('/lists/' + testList._id + '/items/' + testItem._id)
        .set('Authorization', testUser.token)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, done);
      })
      next();
    },

    function deleteItem(next) {
      it('Delete Single Item', (done) => {
        request(app)
        .del('/lists/' + testList._id + '/items/' + testItem._id)
        .set('Authorization', testUser.token)
        .expect(200, done);
      })
      next();
    },

    function deleteList(next) {
      it('Clean Up Test List', (done) => {
        request(app)
        .del('/lists/' + testList._id)
        .set('Authorization', testUser.token)
        .expect(200, done);
      })
      next();
    },

  ]);
});
