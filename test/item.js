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

    function createUser(asyncDone) {
      it('Create A User To Test With', (done) => {
        request(app)
        .post('/register')
        .send({ email: testEmail, password: 'Unit Test' })
        .end( (err, res) => {
          testUser = res.body;
          done();
        });
      })
      asyncDone();
    },

    function createList(asyncDone) {
      it('POST /lists - Create A List', (done) => {
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
      asyncDone();
    },

    function createAnItem(asyncDone) {
      it('POST /lists/:listID/items - Create A Test Item', (done) => {
        request(app)
        .post('/lists/' + testList + '/items')
        .set('Authorization', testUser.token)
        .send({ name: 'Test Item' })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .end( (err, res) => {
          testItem = res.body;
          done();
        });
      })
      asyncDone();
    },

    function getAllItems(asyncDone) {
      it('GET /lists/:listID/items - Get All Items', (done) => {
        request(app)
        .get('/lists/' + testList._id + '/items/')
        .set('Authorization', testUser.token)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, done);
      })
      asyncDone();
    },

    function deleteItem(asyncDone) {
      it('DELETE /lists/:listID/items/:itemID - Delette An Item', (done) => {
        request(app)
        .del('/lists/' + testList._id + '/items/' + testItem._id)
        .set('Authorization', testUser.token)
        .expect(200, done);
      })
      asyncDone();
    },

    function deleteList(asyncDone) {
      it('DELETE /lists/:listID - Clean Up Test List', (done) => {
        request(app)
        .del('/lists/' + testList._id)
        .set('Authorization', testUser.token)
        .expect(200, done);
      })
      asyncDone();
    },

  ]);
});
