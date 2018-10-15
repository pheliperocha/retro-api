const templateMock = require('../mocks/template.mock');

exports.getAll = function(req, res) {
    res.status(200).send(templateMock);
};