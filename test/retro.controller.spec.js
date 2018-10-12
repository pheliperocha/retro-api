const mocha = require('mocha');
let chai = require('chai');
const describe = mocha.describe;
const it = mocha.it;
let chaiHttp = require('chai-http');
let server = require('../app');
const expect = chai.expect;

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
                .end((err, res) => {
                    expect(res.status).to.be.equal(404);
                    expect(res.body.errors).to.have.lengthOf(1);
                    expect(res.body.errors[0].message).to.be.equal('Not Found');
                });
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
                .end((err, res) => {
                    expect(res.status).to.be.equal(404);
                    expect(res.body.errors).to.have.lengthOf(1);
                    expect(res.body.errors[0].message).to.be.equal('Not Found');
                });
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
                .end((err, res) => {
                    expect(res.status).to.be.equal(404);
                    expect(res.body.errors).to.have.lengthOf(1);
                    expect(res.body.errors[0].message).to.be.equal('Not Found');
                });
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
                .end((err, res) => {
                    expect(res.status).to.be.equal(404);
                    expect(res.body.errors).to.have.lengthOf(1);
                    expect(res.body.errors[0].message).to.be.equal('Not Found');
                });
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
                .end((err, res) => {
                    expect(res.status).to.be.equal(404);
                    expect(res.body.errors).to.have.lengthOf(1);
                    expect(res.body.errors[0].message).to.be.equal('Not Found');
                });
        });
    });
});