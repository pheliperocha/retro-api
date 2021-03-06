const createError = require('http-errors');

const cardsMock = require('../mocks/card.mock');

const Cards = require('../models/index').Cards;
const CardVotes = require('../models/index').CardVotes;
const Users = require('../models/index').Users;

exports.get = function(req, res, next) {
    const cardId = req.params.id;

    Cards.findByPk(cardId, {
        attributes: ['id', 'listId', 'description', 'position', 'status'],
        include: [{
            model: CardVotes,
            attributes: ['id', 'status'],
            include: [{
                model: Users,
                attributes: ['id', 'firstname', 'lastname', 'image'],
            }]
        }, {
            model: Users,
            attributes: ['id', 'firstname', 'lastname', 'image'],
        }],
    }).then(card => {
        if (card) res.status(200).send(card);
        else return next(createError(404));
    }).catch(err => {
        return next(createError(err));
    });
};

exports.create = function (req, res) {
    let obj = req.body;
    obj.id = Math.floor(Math.random()*100);
    obj.userId = Math.floor(Math.random()*100);
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

exports.unvote = function (req, res, next) {
    let cardObj = cardsMock.find(card => card.id === parseInt(req.params.id));
    if (cardObj) res.status(204).send();
    else return next(createError(404));
};