const createError = require('http-errors');

const usersMock = require('../mocks/user.mock');
const annotationMock = require('../mocks/annotation.mock');

exports.create = function(req, res) {
    let obj = req.body;
    obj.id = 1;
    obj.userId = Math.floor(Math.random()*100);
    obj.status = true;

    res.set('Location', 'http://localhost:3000/annotations/' + obj.id);

    res.status(201).send(obj);
};

exports.addResponsible = function(req, res, next) {
    let userId = req.body.userId;
    let annotationObj = annotationMock.find(annotation => annotation.id === parseInt(req.params.id));
    let userObj = usersMock.find(user => user.id === parseInt(userId));
    res.set('Location', 'http://localhost:3000/retro/1/members/' + userId);
    if (annotationObj && userObj) res.status(204).send();
    else return next(createError(404));
};

exports.removeResponsible = function(req, res, next) {
    let annotationObj = annotationMock.find(annotation => annotation.id === parseInt(req.params.annotationId));
    let userObj = usersMock.find(user => user.id === parseInt(req.params.userId));
    if (annotationObj && userObj) res.status(204).send();
    else return next(createError(404));
};