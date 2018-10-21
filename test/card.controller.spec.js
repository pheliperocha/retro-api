const mocha = require('mocha'),
    chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('../app'),
    describe = mocha.describe,
    it = mocha.it,
    expect = chai.expect;

const notFoundAssertion = require('./helpers/notFoundAssertion');
const cardsMock = require('../mocks/card.mock');

chai.use(chaiHttp);

describe('CardController', function() {
    describe('GET', function() {
        it('SHOULD return a card object by id', function() {
            chai.request(server)
                .get('/cards/1')
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body).to.deep.equal(cardsMock[0]);
                });
        });

        it('SHOULD NOT return a card for a nonexistent card id', function() {
            chai.request(server)
                .get('/cards/5')
                .end(notFoundAssertion);
        });
    });

    describe('POST', function() {
        it('SHOULD create a new card', function() {
            const descriptionMock = 'New Card Description';
            const retroIdMock = 1;
            const listIdMock = 1;

            chai.request(server)
                .post('/cards/')
                .send({
                    'description': descriptionMock,
                    'listId': listIdMock,
                    'retroId': retroIdMock
                })
                .end((err, res) => {
                    expect(res.status).to.be.equal(201);
                    expect(res.body.description).to.be.equal(descriptionMock);
                    expect(res.body.retroId).to.be.equal(retroIdMock);
                    expect(res.body.listId).to.be.equal(listIdMock);
                    expect(res.body.id).to.not.be.undefined;
                    expect(res.body.userId).to.not.be.undefined;
                    expect(res.body.status).to.be.true;
                    expect(res.header.location).to.not.be.undefined;
                });
        });

        it('SHOULD return success on voting in a card', function() {
            chai.request(server)
                .post('/cards/1/vote')
                .end((err, res) => {
                    expect(res.status).to.be.equal(204);
                    expect(res.header.location).to.not.be.undefined;
                });
        });
    });

    describe('PATCH', function() {
        it('SHOULD return success on update a Card', function() {
            chai.request(server)
                .patch('/cards/1')
                .send({
                    'title': 'New Card Title',
                })
                .end((err, res) => {
                    expect(res.status).to.be.equal(204);
                    expect(res.header.location).to.not.be.undefined;
                });
        });

        it('SHOULD NOT return success on update a nonexistent Card', function() {
            chai.request(server)
                .patch('/cards/5')
                .send({
                    'title': 'New Card Title',
                })
                .end(notFoundAssertion);
        });
    });

    describe('DELETE', function() {
        it('SHOULD return success on deleting a card', function() {
            chai.request(server)
                .del('/cards/1')
                .end((err, res) => {
                    expect(res.status).to.be.equal(204);
                });
        });

        it('SHOULD NOT return success on deleting a nonexistent card', function() {
            chai.request(server)
                .del('/cards/5')
                .end(notFoundAssertion);
        });

        it('SHOULD return success on unvoting a card', function() {
            chai.request(server)
                .del('/cards/1/vote')
                .end((err, res) => {
                    expect(res.status).to.be.equal(204);
                });
        });
    });
});