const mocha = require('mocha'),
    chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('../app'),
    describe = mocha.describe,
    it = mocha.it,
    expect = chai.expect;

const templateMock = require('../mocks/template.mock');

chai.use(chaiHttp);

describe('UserController', function() {
    describe('GET', function() {
        it('SHOULD return an array of templates', function() {
            chai.request(server)
                .get('/templates')
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body).to.deep.equal(templateMock);
                });
        });
    });
});