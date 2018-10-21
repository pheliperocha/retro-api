const mocha = require('mocha'),
    chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('../app'),
    describe = mocha.describe,
    it = mocha.it,
    expect = chai.expect;

const notFoundAssertion = require('./helpers/notFoundAssertion');

chai.use(chaiHttp);

describe('RetroController', function() {
    describe('POST', function() {
        it('SHOULD create a new Annotation', function() {
            const descriptionMock = 'New Annotation description';

            chai.request(server)
                .post('/annotations/')
                .send({
                    'cardId': 1,
                    'retroId': 1,
                    'description': descriptionMock
                })
                .end((err, res) => {
                    expect(res.status).to.be.equal(201);
                    expect(res.body.description).to.be.equal(descriptionMock);
                    expect(res.body.id).to.not.be.undefined;
                    expect(res.body.userId).to.not.be.undefined;
                    expect(res.body.status).to.be.true;
                    expect(res.header.location).to.not.be.undefined;
                });
        });

        it('SHOULD add a new responsible on the Annotation', function() {
            chai.request(server)
                .post('/annotations/1/users')
                .send({
                    'userId': 1
                })
                .end((err, res) => {
                    expect(res.status).to.be.equal(204);
                    expect(res.header.location).to.not.be.undefined;
                });
        });

        it('SHOULD NOT add a new responsible on a nonexistent Annotation', function() {
            chai.request(server)
                .post('/annotations/5/users')
                .send({
                    'userId': 1
                })
                .end(notFoundAssertion);
        });

        it('SHOULD NOT add a nonexistent user as a new responsible of an Annotation', function() {
            chai.request(server)
                .post('/annotations/1/users')
                .send({
                    'userId': 5
                })
                .end(notFoundAssertion);
        });
    });

    describe('DELETE', function() {
        it('SHOULD return success on deleting an user from an Annotation', function() {
            chai.request(server)
                .del('/annotations/1/users/1')
                .end((err, res) => {
                    expect(res.status).to.be.equal(204);
                });
        });
    });
});