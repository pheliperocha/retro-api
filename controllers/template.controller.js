const Templates = require('../models/index').Templates;
const createError = require('http-errors');

exports.getAll = function(req, res, next) {
    Templates.findAll({ where: [{status: true}] })
        .then(obj => {
            if (obj) res.status(200).send(obj);
            else return next(createError(404));
        }).catch(err => {
            return next(createError(err));
        });
};