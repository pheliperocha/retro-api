const mocha = require('mocha'),
    chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('../app'),
    describe = mocha.describe,
    before = mocha.before,
    it = mocha.it,
    expect = chai.expect;

const userMock = require('../mocks/user.mock');
const retroMock = require('../mocks/retro.mock');
const annotationMock = require('../mocks/annotation.mock');

chai.use(chaiHttp);

let token = '';

describe('UserController', function() {
    before((done) => {
        chai.request(server)
            .get('/users/login')
            .end((err, res) => {
                token = 'Barear ' + res.body.token;
                done();
            });
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

    describe('POST', function() {
        it('SHOULD return a token and a user object to a valid login', (done) => {
            chai.request(server)
                .post('/users/login')
                .send({
                    code: 'VALID_CODE',
                    clientId: 'CLIENT_ID',
                    redirectUri: 'REDIRECT_URL'
                })
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body.token).to.not.be.undefined;
                    expect(res.body.token).to.not.be.null;
                    expect(res.body.user).to.deep.equal(userMock[0]);
                    done();
                });
        });
    });
});