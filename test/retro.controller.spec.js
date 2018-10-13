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
        it('SHOULD return a retro object by id', function() {
            chai.request(server)
                .get('/retro/1')
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body).to.deep.equal(retroMock[0]);
                });
        });

        it('SHOULD NOT return a retro for a nonexistent retro id', function() {
            chai.request(server)
                .get('/retro/5')
                .end(notFoundAssertion);
        });

        it('SHOULD return a retro object by PIN code', function() {
            chai.request(server)
                .get('/retro/pincode/9876543')
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body).to.deep.equal(retroMock[1]);
                });
        });

        it('SHOULD NOT return a retro for a nonexistent PIN code', function() {
            chai.request(server)
                .get('/retro/pincode/5843214')
                .end(notFoundAssertion);
        });

        it('SHOULD return a array of list from a retro', function() {
            chai.request(server)
                .get('/retro/1/lists')
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body).to.have.lengthOf(2);
                    expect(res.body).to.deep.equal(listsMock);
                });
        });

        it('SHOULD NOT return an array of list for a nonexistent retro', function() {
            chai.request(server)
                .get('/retro/5/lists')
                .end(notFoundAssertion);
        });

        it('SHOULD return a array of cards from a retro', function() {
            chai.request(server)
                .get('/retro/1/cards')
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body).to.have.lengthOf(2);
                    expect(res.body).to.deep.equal(cardsMock);
                });
        });

        it('SHOULD NOT return an array of cards for a nonexistent retro', function() {
            chai.request(server)
                .get('/retro/5/cards')
                .end(notFoundAssertion);
        });

        it('SHOULD return the facilitator of the retro', function() {
            chai.request(server)
                .get('/retro/1/user')
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body).to.deep.equal(usersMock[0]);
                });
        });

        it('SHOULD NOT return the facilitator for a nonexistent retro', function() {
            chai.request(server)
                .get('/retro/5/user')
                .end(notFoundAssertion);
        });
    });

    describe('POST', function() {
        it('SHOULD create a new Retro', function() {
            const titleMock = 'New Retrospective Title';
            const contextMock = 'New Retrospective Context';

            chai.request(server)
                .post('/retro/')
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
                    expect(res.body.userid).to.not.be.undefined;
                    expect(res.body.status).to.be.true;
                    expect(res.header.location).to.not.be.undefined;
                });
        });

        it('SHOULD add a new member on the Retro', function() {
            chai.request(server)
                .post('/retro/1/member')
                .send({
                    'memberId': 1
                })
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body).to.deep.equal(usersMock[0]);
                    expect(res.header.location).to.not.be.undefined;
                });
        });

        it('SHOULD NOT add a new member on a nonexistent Retro', function() {
            chai.request(server)
                .post('/retro/5/member')
                .send({
                    'memberId': 1
                })
                .end(notFoundAssertion);
        });

        it('SHOULD NOT add a nonexistent user as a new member of a Retro', function() {
            chai.request(server)
                .post('/retro/1/member')
                .send({
                    'memberId': 5
                })
                .end(notFoundAssertion);
        });
    });

    describe('PATCH', function() {
        it('SHOULD return success on update a Retro', function() {
            chai.request(server)
                .patch('/retro/1')
                .send({
                    'title': 'New Retro Title',
                    'context': 'New Retro Title',
                })
                .end((err, res) => {
                    expect(res.status).to.be.equal(204);
                    expect(res.header.location).to.not.be.undefined;
                });
        });

        it('SHOULD NOT return success on update a nonexistent Retro', function() {
            chai.request(server)
                .patch('/retro/5')
                .send({
                    'title': 'New Retro Title',
                    'context': 'New Retro Title',
                })
                .end(notFoundAssertion);
        });

        it('SHOULD return success on updating the positions of the lists from a Retro', function() {
            chai.request(server)
                .patch('/retro/1/lists/positions')
                .send({
                    'listid': 1,
                    'position': 1,
                })
                .end((err, res) => {
                    expect(res.status).to.be.equal(204);
                    expect(res.header.location).to.not.be.undefined;
                });
        });
    });

    describe('DELETE', function() {
        it('SHOULD return success on deleting a member from a Retro', function() {
            chai.request(server)
                .del('/retro/1/member/1')
                .end((err, res) => {
                    expect(res.status).to.be.equal(204);
                });
        });
    });
});