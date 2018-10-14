const userMock = require('../mocks/user.mock');

exports.login = function(req, res) {
    res.status(200).send({
        token: 'VALID_TOKEN',
        user: userMock[0]
    });
};