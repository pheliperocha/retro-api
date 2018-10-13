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

    describe('POST', function() {
        it('SHOULD create a new list', function() {
            const titleMock = 'New List Title';
            const retroIdMock = 1;

            chai.request(server)
                .post('/lists/')
                .send({
                    'title': titleMock,
                    'retroid': retroIdMock
                })
                .end((err, res) => {
                    expect(res.status).to.be.equal(201);
                    expect(res.body.title).to.be.equal(titleMock);
                    expect(res.body.retroid).to.be.equal(retroIdMock);
                    expect(res.body.id).to.not.be.undefined;
                    expect(res.body.userid).to.not.be.undefined;
                    expect(res.body.status).to.be.true;
                    expect(res.header.location).to.not.be.undefined;
                });
        });
    });

    describe('PATCH', function() {
        it('SHOULD return success on update a List', function() {
            chai.request(server)
                .patch('/lists/1')
                .send({
                    'title': 'New List Title',
                })
                .end((err, res) => {
                    expect(res.status).to.be.equal(204);
                    expect(res.header.location).to.not.be.undefined;
                });
        });

        it('SHOULD NOT return success on update a nonexistent List', function() {
            chai.request(server)
                .patch('/lists/5')
                .send({
                    'title': 'New List Title',
                })
                .end(notFoundAssertion);
        });
    });

    describe('DELETE', function() {
        it('SHOULD return success on deleting a list', function() {
            chai.request(server)
                .del('/lists/1')
                .end((err, res) => {
                    expect(res.status).to.be.equal(204);
                });
        });

        it('SHOULD NOT return success on deleting a nonexistent list', function() {
            chai.request(server)
                .del('/lists/5')
                .end(notFoundAssertion);
        });
    });
});