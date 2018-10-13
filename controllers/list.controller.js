const createError = require('http-errors');

const listsMock = require('../mocks/list.mock');

exports.get = function(req, res, next) {
    let obj = listsMock.find(list => list.id === parseInt(req.params.id));
    if (obj) res.status(200).send(obj);
    else return next(createError(404));
};