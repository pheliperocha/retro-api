const createError = require('http-errors');

const cardsMock = require('../mocks/card.mock');

exports.get = function(req, res, next) {
    let obj = cardsMock.find(card => card.id === parseInt(req.params.id));
    if (obj) res.status(200).send(obj);
    else return next(createError(404));
};

exports.create = function (req, res) {
    let obj = req.body;
    obj.id = Math.floor(Math.random()*100);
    obj.userid = Math.floor(Math.random()*100);
    obj.status = true;

    res.set('Location', 'http://localhost:3000/cards/' + obj.id);

    res.status(201).send(obj);
};

exports.update = function (req, res, next) {
    let obj = cardsMock.find(card => card.id === parseInt(req.params.id));

    res.set('Location', 'http://localhost:3000/cards/' + req.params.id);

    if (obj) res.status(204).send();
    else return next(createError(404));
};

exports.delete = function (req, res, next) {
    let cardObj = cardsMock.find(card => card.id === parseInt(req.params.id));
    if (cardObj) res.status(204).send();
    else return next(createError(404));
};

exports.vote = function (req, res, next) {
    let cardObj = cardsMock.find(card => card.id === parseInt(req.params.id));

    res.set('Location', 'http://localhost:3000/cards/' + req.params.id);

    if (cardObj) res.status(204).send();
    else return next(createError(404));
};