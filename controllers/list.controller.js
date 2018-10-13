const createError = require('http-errors');

const listsMock = require('../mocks/list.mock');

exports.get = function(req, res, next) {
    let obj = listsMock.find(list => list.id === parseInt(req.params.id));
    if (obj) res.status(200).send(obj);
    else return next(createError(404));
};

exports.create = function (req, res) {
    let obj = req.body;
    obj.id = Math.floor(Math.random()*100);
    obj.userid = Math.floor(Math.random()*100);
    obj.status = true;

    res.set('Location', 'http://localhost:3000/lists/' + obj.id);

    res.status(201).send(obj);
};

exports.update = function (req, res, next) {
    let obj = listsMock.find(list => list.id === parseInt(req.params.id));

    res.set('Location', 'http://localhost:3000/lists/' + req.params.id);

    if (obj) res.status(204).send();
    else return next(createError(404));
};

exports.delete = function (req, res, next) {
    let listObj = listsMock.find(list => list.id === parseInt(req.params.id));
    if (listObj) res.status(204).send();
    else return next(createError(404));
};