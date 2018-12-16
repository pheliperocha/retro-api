const userMock = require('../mocks/user.mock');
const retroMock = require('../mocks/retro.mock');

const createError = require('http-errors');

const Users = require('../models/index').Users;
const Annotations = require('../models/index').Annotations;
const Retros = require('../models/index').Retros;
const Cards = require('../models/index').Cards;

exports.getRetro = function(req, res) {
    res.status(200).send(retroMock);
};

exports.getActions = function(req, res, next) {
    const myUserId = 2;
    
    Users.findById(myUserId, {
        attributes: ['id'],
        include: [{
            model: Annotations, as: 'responsibleFor',
            where: [{ status: true }],
            attributes: ['id', 'description'],
            include: [{
                model: Retros,
                attributes: ['id', 'title', 'image'],
            }, {
                model: Cards,
                attributes: ['id', 'description'],
            }]
        }]
    }).then(obj => {
        if (obj) res.status(200).send(obj);
        else return next(createError(404));
    }).catch(err => {
        return next(createError(err));
    });

};

exports.login = function(req, res) {
    res.status(200).send({
        token: 'VALID_TOKEN',
        user: userMock[0]
    });
};