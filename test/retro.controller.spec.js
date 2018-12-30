const mocha = require('mocha'),
    chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('../app'),
    describe = mocha.describe,
    before = mocha.before,
    it = mocha.it,
    expect = chai.expect;

const notFoundAssertion = require('./helpers/notFoundAssertion');
const createUserJwt = require('./helpers/createUserJwt');

const retroMock = require('../mocks/retro.mock');
const listsMock = require('../mocks/list.mock');
const cardsMock = require('../mocks/card.mock');
const usersMock = require('../mocks/user.mock');
const templatesMock = require('../mocks/template.mock');

chai.use(chaiHttp);

let token = '';
const userIndex = 1;

describe('RetroController', function() {
    before((done) => {
        const jwt = createUserJwt(userIndex);
        token = 'Barear ' + jwt;
        done();
    });

    describe('GET', function() {
        it('SHOULD return a retro object by id', function(done) {
            chai.request(server)
                .get('/retros/1')
                .set('authorization', token)
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body.id).to.equal(retroMock[0].id);
                    expect(res.body.title).to.equal(retroMock[0].title);
                    expect(res.body.context).to.equal(retroMock[0].context);
                    expect(res.body.Facilitator.id).to.equal(retroMock[0].userId);
                    expect(res.body.Facilitator.firstname).to.equal(usersMock[0].firstname);
                    done();
                });
        });

        it('SHOULD NOT return a retro for a nonexistent retro id', function(done) {
            chai.request(server)
                .get('/retros/33')
                .set('authorization', token)
                .then(notFoundAssertion)
                .then(done);
        });

        it('SHOULD return a retro object by PIN code', function(done) {
            chai.request(server)
                .get('/retros/pincode/9876543')
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body).to.deep.equal(retroMock[1]);
                    done();
                });
        });

        it('SHOULD NOT return a retro for a nonexistent PIN code', function(done) {
            chai.request(server)
                .get('/retros/pincode/5843214')
                .then(notFoundAssertion)
                .then(done);
        });

        it('SHOULD return a array of list from a retro', function(done) {
            const retroId = 1;
            chai.request(server)
                .get(`/retros/${retroId}/lists`)
                .set('authorization', token)
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body).to.have.lengthOf(2);
                    expect(res.body[0].title).to.equal(listsMock[0].title);
                    expect(res.body[1].position).to.equal(listsMock[1].position);
                    expect(res.body[0].retroId).to.equal(retroId);
                    done();
                });
        });

        it('SHOULD NOT return an array of list for a nonexistent retro', function(done) {
            chai.request(server)
                .get('/retros/33/lists')
                .set('authorization', token)
                .then(notFoundAssertion)
                .then(done);
        });

        it('SHOULD return a array of cards from a retro', function(done) {
            chai.request(server)
                .get('/retros/1/cards')
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body).to.have.lengthOf(2);
                    expect(res.body).to.deep.equal(cardsMock);
                    done();
                });
        });

        it('SHOULD NOT return an array of cards for a nonexistent retro', function(done) {
            chai.request(server)
                .get('/retros/5/cards')
                .then(notFoundAssertion)
                .then(done);
        });

        it('SHOULD return the facilitator of the retro', function(done) {
            chai.request(server)
                .get('/retros/1/users')
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body).to.deep.equal(usersMock[0]);
                    done();
                });
        });

        it('SHOULD NOT return the facilitator for a nonexistent retro', function(done) {
            chai.request(server)
                .get('/retros/5/users')
                .then(notFoundAssertion)
                .then(done);
        });
    });

    describe('POST', function() {
        it('SHOULD create a new Retro', function(done) {
            const titleMock = 'New Retrospective Title';
            const contextMock = 'New Retrospective Context';

            chai.request(server)
                .post('/retros/')
                .set('authorization', token)
                .send({
                    title: titleMock,
                    context: contextMock,
                    templateId: templatesMock[0].id
                })
                .end((err, resRetro) => {
                    expect(resRetro.status).to.be.equal(201);
                    
                    expect(resRetro.body.title).to.be.equal(titleMock);
                    expect(resRetro.body.context).to.be.equal(contextMock);
                    expect(resRetro.body.id).to.not.be.undefined;
                    expect(resRetro.body.status).to.be.true;
                    expect(resRetro.body.state).to.be.equal(1);
                    expect(resRetro.body.image).to.be.equal(templatesMock[0].image);

                    expect(resRetro.body.userId).to.be.equal(usersMock[userIndex].id);
                    
                    expect(resRetro.header.location).to.contain(`${global.gConfig.apiUrl}retro/${resRetro.body.id}`);

                    chai.request(server)
                        .get(`/retros/${resRetro.body.id}/lists`)
                        .set('authorization', token)
                        .end((err, resLists) => {
                            expect(resLists.body).lengthOf(JSON.parse(templatesMock[0].structure).length);
                            done();
                        });
                });
        });

        it('SHOULD add a new member on the Retro', function(done) {
            chai.request(server)
                .post('/retros/1/members')
                .send({
                    'memberId': 1
                })
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body).to.deep.equal(usersMock[0]);
                    expect(res.header.location).to.not.be.undefined;
                    done();
                });
        });

        it('SHOULD NOT add a new member on a nonexistent Retro', function(done) {
            chai.request(server)
                .post('/retros/5/members')
                .send({
                    'memberId': 1
                })
                .then(notFoundAssertion)
                .then(done);
        });

        it('SHOULD NOT add a nonexistent user as a new member of a Retro', function(done) {
            chai.request(server)
                .post('/retros/1/members')
                .send({
                    'memberId': 5
                })
                .then(notFoundAssertion)
                .then(done);
        });
    });

    describe('PATCH', function() {
        it('SHOULD return success on update a Retro', function(done) {
            chai.request(server)
                .patch('/retros/1')
                .send({
                    'title': 'New Retro Title',
                    'context': 'New Retro Title',
                })
                .end((err, res) => {
                    expect(res.status).to.be.equal(204);
                    expect(res.header.location).to.not.be.undefined;
                    done();
                });
        });

        it('SHOULD NOT return success on update a nonexistent Retro', function(done) {
            chai.request(server)
                .patch('/retros/5')
                .send({
                    'title': 'New Retro Title',
                    'context': 'New Retro Title',
                })
                .then(notFoundAssertion)
                .then(done);
        });

        it('SHOULD return success on updating the positions of the lists from a Retro', function(done) {
            chai.request(server)
                .patch('/retros/1/lists/positions')
                .send({
                    'listId': 1,
                    'position': 1,
                })
                .end((err, res) => {
                    expect(res.status).to.be.equal(204);
                    expect(res.header.location).to.not.be.undefined;
                    done();
                });
        });
    });

    describe('DELETE', function() {
        it('SHOULD return success on deleting a member from a Retro', function(done) {
            chai.request(server)
                .del('/retros/1/members/1')
                .end((err, res) => {
                    expect(res.status).to.be.equal(204);
                    done();
                });
        });
    });
});