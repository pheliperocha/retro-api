const mocha = require('mocha'),
    chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('../app'),
    describe = mocha.describe,
    it = mocha.it,
    expect = chai.expect;

chai.use(chaiHttp);

describe('UserController', function() {
    describe('GET', function() {
        it('SHOULD return an array of templates', function(done) {
            chai.request(server)
                .get('/templates')
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body.length).to.equal(2);

                    expect(res.body[0].id).to.equal(1);
                    expect(res.body[0].title).to.equal('Hopes and Concerns');

                    expect(res.body[1].id).to.equal(2);
                    expect(res.body[1].title).to.equal('Nice and Ok');
                    done();
                });
        });
    });
});