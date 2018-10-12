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

exports.create = function (req, res) {
    let obj = req.body;
    obj.id = Math.floor(Math.random()*100);
    obj.userid = Math.floor(Math.random()*100);
    obj.status = true;

    res.set('Location', 'http://localhost:3000/retro/' + obj.id);

    return res.status(201).send(obj);
};

exports.addMember = function (req, res, next) {
    let memberId = req.body.memberId;
    let obj = usersMock.find(user => user.id === parseInt(memberId));
    res.set('Location', 'http://localhost:3000/retro/1/members/' + memberId);
    if (retroMock[req.params.id] && obj) res.status(200).send(obj);
    else return next(createError(404));
};