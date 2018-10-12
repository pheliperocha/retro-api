const createError = require('http-errors');

const retroMock = require('../mocks/retro.mock');
const listsMock = require('../mocks/list.mock');
const cardsMock = require('../mocks/card.mock');
const usersMock = require('../mocks/user.mock');

exports.get = function(req, res, next) {
    let obj = retroMock.find(retro => retro.id === parseInt(req.params.id));
    if (obj) res.status(200).send(obj);
    else return next(createError(404));
};

exports.getByPin = function(req, res, next) {
    let obj = retroMock.find(retro => retro.pin == req.params.pin);
    if (obj) res.status(200).send(obj);
    else return next(createError(404));
};

exports.getLists = function(req, res, next) {
    let obj = listsMock.map(list => { list.retroid = req.params.id; return list; });
    if (retroMock[req.params.id]) res.status(200).send(obj);
    else return next(createError(404));
};

exports.getCards = function(req, res, next) {
    let obj = cardsMock.map(card => { card.retroid = req.params.id; return card; });
    if (retroMock[req.params.id]) res.status(200).send(obj);
    else return next(createError(404));
};

exports.getFacilitator = function(req, res, next) {
    let obj = usersMock[0];
    if (retroMock[req.params.id]) res.status(200).send(obj);
    else return next(createError(404));
};