const mocha = require('mocha'),
    chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('../app'),
    describe = mocha.describe,
    it = mocha.it,
    expect = chai.expect;

const userMock = require('../mocks/user.mock');

chai.use(chaiHttp);

describe.only('UserController', function() {
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