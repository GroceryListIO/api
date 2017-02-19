process.env.ENV = 'Test';
const request = require('supertest');
const app = require('../index.js');
const async = require('async');

let testItem = {};
let testList = {};

describe('Items', () => {
  async.series([

    function createList(asyncDone) {
      it('POST /lists - Create A List To Test On', (done) => {
        request(app)
        .post('/lists')
        .send({ name: 'Item Test List', description: 'Unit test for items.' })
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
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, done);
      })
      asyncDone();
    },

    function deleteItem(asyncDone) {
      it('DELETE /lists/:listID/items/:itemID - Delette An Item', (done) => {
        request(app)
        .del('/lists/' + testList._id + '/items/' + testItem._id)
        .expect(200, done);
      })
      asyncDone();
    },

    function deleteList(asyncDone) {
      it('DELETE /lists/:listID - Clean Up Test List', (done) => {
        request(app)
        .del('/lists/' + testList._id)
        .expect(200, done);
      })
      asyncDone();
    },

  ]);
});
