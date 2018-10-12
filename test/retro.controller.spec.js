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

chai.use(chaiHttp);

describe('RetroController', function() {
    describe('GET', function() {
        it('should return a retro object by id', function() {
            chai.request(server)
                .get('/retro/1')
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body).to.deep.equal(retroMock[0]);
                });
        });

        it('should return a retro object by PIN code', function() {
            chai.request(server)
                .get('/retro/pincode/9876543')
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body).to.deep.equal(retroMock[1]);
                });
        });

        it('should return a array of list from a retro', function() {
            chai.request(server)
                .get('/retro/1/lists')
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body).to.have.lengthOf(2);
                    expect(res.body).to.deep.equal(listsMock);
                });
        });

        it('should return a array of cards from a retro', function() {
            chai.request(server)
                .get('/retro/1/cards')
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body).to.have.lengthOf(2);
                    expect(res.body).to.deep.equal(cardsMock);
                });
        });
    });
});