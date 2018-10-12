const retroMock = require('../mocks/retro.mock');
const listsMock = require('../mocks/list.mock');

exports.get = function(req, res) {
    let obj = retroMock.find(retro => retro.id == req.params.id);
    return res.status(200).send(obj);
};

exports.getByPin = function(req, res) {
    let obj = retroMock.find(retro => retro.pin == req.params.pin);
    return res.status(200).send(obj);
};

exports.getLists = function(req, res) {
    let obj = listsMock.map(list => { list.retroid = req.params.id; return list; });
    return res.status(200).send(obj);
};