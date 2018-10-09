const retroMock = require('../mocks/retro.mock');

exports.get = function(req, res) {
    let obj = retroMock;
    obj.id = req.params.id;
    return res.status(200).send(obj);
};