const retroMock = require('../mocks/retro.mock');
const listsMock = require('../mocks/list.mock');
const cardsMock = require('../mocks/card.mock');
const usersMock = require('../mocks/user.mock');

exports.get = function(req, res) {
    let obj = retroMock.find(retro => retro.id === parseInt(req.params.id));
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

exports.getCards = function(req, res) {
    let obj = cardsMock.map(card => { card.retroid = req.params.id; return card; });
    return res.status(200).send(obj);
};

exports.getFacilitator = function(req, res) {
    let obj = usersMock[0];
    return res.status(200).send(obj);
};