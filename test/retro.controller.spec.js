const mocha = require('mocha'),
    chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('../app'),
    describe = mocha.describe,
    it = mocha.it,
    expect = chai.expect;

const notFoundAssertion = require('./helpers/notFoundAssertion');

const retroMock = require('../mocks/retro.mock');
const listsMock = require('../mocks/list.mock');
const cardsMock = require('../mocks/card.mock');
const usersMock = require('../mocks/user.mock');

chai.use(chaiHttp);

describe('RetroController', function() {
    describe('GET', function() {
        it('SHOULD return a retro object by id', function(done) {
            chai.request(server)
                .get('/retros/1')
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body).to.deep.equal(retroMock[0]);
                    done();
                });
        });

        it('SHOULD NOT return a retro for a nonexistent retro id', function(done) {
            chai.request(server)
                .get('/retros/5')
                .then(notFoundAssertion)
                .then(done);
        });

        it('SHOULD return a retro object by PIN code', function(done) {
            chai.request(server)
                .get('/retros/pincode/9876543')
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body).to.deep.equal(retroMock[1]);
                    done();
                });
        });

        it('SHOULD NOT return a retro for a nonexistent PIN code', function(done) {
            chai.request(server)
                .get('/retros/pincode/5843214')
                .then(notFoundAssertion)
                .then(done);
        });

        it('SHOULD return a array of list from a retro', function(done) {
            chai.request(server)
                .get('/retros/1/lists')
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body).to.have.lengthOf(2);
                    expect(res.body).to.deep.equal(listsMock);
                    done();
                });
        });

        it('SHOULD NOT return an array of list for a nonexistent retro', function(done) {
            chai.request(server)
                .get('/retros/5/lists')
                .then(notFoundAssertion)
                .then(done);
        });

        it('SHOULD return a array of cards from a retro', function(done) {
            chai.request(server)
                .get('/retros/1/cards')
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body).to.have.lengthOf(2);
                    expect(res.body).to.deep.equal(cardsMock);
                    done();
                });
        });

        it('SHOULD NOT return an array of cards for a nonexistent retro', function(done) {
            chai.request(server)
                .get('/retros/5/cards')
                .then(notFoundAssertion)
                .then(done);
        });

        it('SHOULD return the facilitator of the retro', function(done) {
            chai.request(server)
                .get('/retros/1/users')
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body).to.deep.equal(usersMock[0]);
                    done();
                });
        });

        it('SHOULD NOT return the facilitator for a nonexistent retro', function(done) {
            chai.request(server)
                .get('/retros/5/users')
                .then(notFoundAssertion)
                .then(done);
        });
    });

    describe('POST', function() {
        it('SHOULD create a new Retro', function(done) {
            const titleMock = 'New Retrospective Title';
            const contextMock = 'New Retrospective Context';

            chai.request(server)
                .post('/retros/')
                .send({
                    'title': titleMock,
                    'context': contextMock,
                    'image': null
                })
                .end((err, res) => {
                    expect(res.status).to.be.equal(201);
                    expect(res.body.title).to.be.equal(titleMock);
                    expect(res.body.context).to.be.equal(contextMock);
                    expect(res.body.id).to.not.be.undefined;
                    expect(res.body.userId).to.not.be.undefined;
                    expect(res.body.status).to.be.true;
                    expect(res.header.location).to.not.be.undefined;
                    done();
                });
        });

        it('SHOULD add a new member on the Retro', function(done) {
            chai.request(server)
                .post('/retros/1/members')
                .send({
                    'memberId': 1
                })
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body).to.deep.equal(usersMock[0]);
                    expect(res.header.location).to.not.be.undefined;
                    done();
                });
        });

        it('SHOULD NOT add a new member on a nonexistent Retro', function(done) {
            chai.request(server)
                .post('/retros/5/members')
                .send({
                    'memberId': 1
                })
                .then(notFoundAssertion)
                .then(done);
        });

        it('SHOULD NOT add a nonexistent user as a new member of a Retro', function(done) {
            chai.request(server)
                .post('/retros/1/members')
                .send({
                    'memberId': 5
                })
                .then(notFoundAssertion)
                .then(done);
        });
    });

    describe('PATCH', function() {
        it('SHOULD return success on update a Retro', function(done) {
            chai.request(server)
                .patch('/retros/1')
                .send({
                    'title': 'New Retro Title',
                    'context': 'New Retro Title',
                })
                .end((err, res) => {
                    expect(res.status).to.be.equal(204);
                    expect(res.header.location).to.not.be.undefined;
                    done();
                });
        });

        it('SHOULD NOT return success on update a nonexistent Retro', function(done) {
            chai.request(server)
                .patch('/retros/5')
                .send({
                    'title': 'New Retro Title',
                    'context': 'New Retro Title',
                })
                .then(notFoundAssertion)
                .then(done);
        });

        it('SHOULD return success on updating the positions of the lists from a Retro', function(done) {
            chai.request(server)
                .patch('/retros/1/lists/positions')
                .send({
                    'listId': 1,
                    'position': 1,
                })
                .end((err, res) => {
                    expect(res.status).to.be.equal(204);
                    expect(res.header.location).to.not.be.undefined;
                    done();
                });
        });
    });

    describe('DELETE', function() {
        it('SHOULD return success on deleting a member from a Retro', function(done) {
            chai.request(server)
                .del('/retros/1/members/1')
                .end((err, res) => {
                    expect(res.status).to.be.equal(204);
                    done();
                });
        });
    });
});