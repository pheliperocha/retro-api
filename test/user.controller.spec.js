const mocha = require('mocha'),
    chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('../app'),
    describe = mocha.describe,
    before = mocha.before,
    it = mocha.it,
    expect = chai.expect;

const retroMock = require('../mocks/retro.mock');
const annotationMock = require('../mocks/annotation.mock');
const createUserJwt = require('./helpers/createUserJwt');

chai.use(chaiHttp);

let token = '';

describe('UserController', function() {
    before((done) => {
        const jwt = createUserJwt();
        token = 'Barear ' + jwt;
        done();
    });

    describe('GET', function() {
        it('SHOULD NOT allow from unauthenticated users', (done) => {
            chai.request(server)
                .get('/users/retros')
                .end((err, res) => {
                    expect(res.status).to.be.equal(401);
                    done();
                });
        });

        it('SHOULD return an array of retro from user', (done) => {
            chai.request(server)
                .get('/users/retros')
                .set('authorization', token)
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body).to.deep.equal(retroMock);
                    done();
                });
        });

        it('SHOULD return an array of actions from user', (done) => {
            chai.request(server)
                .get('/users/actions')
                .set('authorization', token)
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body[0].id).to.be.equal(annotationMock[0].id);
                    expect(res.body[0].description).to.be.equal(annotationMock[0].description);
                    done();
                });
        });
    });
});