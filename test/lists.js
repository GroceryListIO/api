process.env.ENV = 'Test';
const request = require('supertest');
const app = require('../index.js');
const async = require('async');

let testList = {};

describe('Lists', () => {
  async.series([

    function createList(asyncDone) {
      it('POST /lists - Create A List', (done) => {
        request(app)
        .post('/lists')
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

    function getAllLists(asyncDone) {
      it('GET /lists - Get All Lists', (done) => {
        request(app)
        .get('/lists')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, done);
      })
      asyncDone();
    },

    function deleteList(asyncDone) {
      it('DELETE /lists/:listID - Delete A List', (done) => {
        request(app)
        .del('/lists/' + testList._id)
        .expect(200, done);
      })
      asyncDone();
    },

  ]);
});
