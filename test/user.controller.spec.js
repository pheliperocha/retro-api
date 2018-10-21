const mocha = require('mocha'),
    chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('../app'),
    describe = mocha.describe,
    it = mocha.it,
    expect = chai.expect;

const userMock = require('../mocks/user.mock');
const retroMock = require('../mocks/retro.mock');
const actionMock = require('../mocks/annotation.mock');

chai.use(chaiHttp);

describe('UserController', function() {
    describe('GET', function() {
        it('SHOULD return an array of retro from user', function() {
            chai.request(server)
                .get('/users/retros')
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body).to.deep.equal(retroMock);
                });
        });

        it('SHOULD return an array of actions from user', function() {
            chai.request(server)
                .get('/users/actions')
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body).to.deep.equal(actionMock);
                });
        });
    });

    describe('POST', function() {
        it('SHOULD return a token and a user object to a valid login', function() {
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
                });
        });
    });
});