const mocha = require('mocha');
let chai = require('chai');
const describe = mocha.describe;
const it = mocha.it;
const retroMock = require('../mocks/retro.mock');
const listsMock = require('../mocks/list.mock');
let chaiHttp = require('chai-http');
let server = require('../app');
const expect = chai.expect;

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
    });
});