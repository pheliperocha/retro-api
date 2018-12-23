const mocha = require('mocha'),
    chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('../app'),
    describe = mocha.describe,
    it = mocha.it,
    expect = chai.expect;

const notFoundAssertion = require('./helpers/notFoundAssertion');

chai.use(chaiHttp);

describe('Index', function() {
    it('should return the app information on root', function(done) {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                expect(res.body.app).to.be.equal('Agile Retrospective');
                expect(res.body.developer).to.be.equal('Phelipe Rocha');
                expect(res.body.website).to.be.equal('https://pheliperocha.com/');
                done();
            });
    });

    it('should return the swagger on docs', function(done) {
        chai.request(server)
            .get('/docs/')
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                expect(res.text).to.include('swagger');
                done();
            });
    });

    it('should return 404 not found', function(done) {
        chai.request(server)
            .get('/any_route')
            .then(notFoundAssertion)
            .then(done);
    });
});