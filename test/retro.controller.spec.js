const mocha = require('mocha');
let chai = require('chai');
const describe = mocha.describe;
const it = mocha.it;
const retroMock = require('../mocks/retro.mock');
let chaiHttp = require('chai-http');
let server = require('../app');
const expect = chai.expect;

chai.use(chaiHttp);

describe('RetroController', function() {
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
});