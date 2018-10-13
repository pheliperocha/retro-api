const mocha = require('mocha'),
    chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('../app'),
    describe = mocha.describe,
    it = mocha.it,
    expect = chai.expect;

const notFoundAssertion = require('./helpers/notFoundAssertion');
const listsMock = require('../mocks/list.mock');

chai.use(chaiHttp);

describe('ListController', function() {
    describe('GET', function() {
        it('SHOULD return a list object by id', function() {
            chai.request(server)
                .get('/lists/1')
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body).to.deep.equal(listsMock[0]);
                });
        });

        it('SHOULD NOT return a list for a nonexistent list id', function() {
            chai.request(server)
                .get('/lists/5')
                .end(notFoundAssertion);
        });
    });
});