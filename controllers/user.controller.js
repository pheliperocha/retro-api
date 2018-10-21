const userMock = require('../mocks/user.mock');
const retroMock = require('../mocks/retro.mock');
const actionMock = require('../mocks/annotation.mock');

exports.getRetro = function(req, res) {
    res.status(200).send(retroMock);
};

exports.getActions = function(req, res) {
    res.status(200).send(actionMock);
};

exports.login = function(req, res) {
    res.status(200).send({
        token: 'VALID_TOKEN',
        user: userMock[0]
    });
};