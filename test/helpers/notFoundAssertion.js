let chai = require('chai');
const expect = chai.expect;

module.exports = (err, res) => {
    expect(res.status).to.be.equal(404);
    expect(res.body.errors).to.have.lengthOf(1);
    expect(res.body.errors[0].message).to.be.equal('Not Found');
};