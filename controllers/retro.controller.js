const createError = require('http-errors');

const retroMock = require('../mocks/retro.mock');
const cardsMock = require('../mocks/card.mock');
const usersMock = require('../mocks/user.mock');

const Models = require('../models/index');
const Sequelize = Models.sequelize;
const Retros = Models.Retros;
const Lists = Models.Lists;
const Templates = Models.Templates;
const Users = Models.Users;

exports.get = function(req, res, next) {
    Retros.findByPk(req.params.id, { include: [{ model: Users, as: 'Facilitator' }] }).then(obj => {
        return res.status(200).send(obj);
    }).catch(err => next(createError(err)));
};

exports.getByPin = function(req, res, next) {
    let obj = retroMock.find(retro => retro.pin == req.params.pin);
    if (obj) res.status(200).send(obj);
    else return next(createError(404));
};

exports.getLists = function(req, res, next) {
    Retros.findByPk(req.params.id, { include: [{ model: Lists }] }).then(obj => {
        return res.status(200).send(obj.Lists);
    }).catch(err => next(createError(err)));
};

exports.getCards = function(req, res, next) {
    let obj = cardsMock.map(card => { card.retroId = req.params.id; return card; });
    if (retroMock[req.params.id]) res.status(200).send(obj);
    else return next(createError(404));
};

exports.getFacilitator = function(req, res, next) {
    let obj = usersMock[0];
    if (retroMock[req.params.id]) res.status(200).send(obj);
    else return next(createError(404));
};

exports.create = function (req, res, next) {
    let { title, context, templateId } = req.body;

    Templates.findByPk(templateId).then(template => {

        const obj = {
            title,
            context,
            image: template.image,
            userId: req.user.id,
            state: 1,
            status: true
        };

        Sequelize.transaction((t) => {

            return Retros.create(obj, { transaction: t }).then(retro => {
                res.set('Location', `${global.gConfig.apiUrl}retro/${retro.id}`);

                const lists = [];
                const listTitles = JSON.parse(template.structure);
                for (const [index, title] of listTitles.entries()) {
                    lists.push({
                        title: title,
                        retroId: retro.id,
                        status: true,
                        position: index
                    });
                }

                return Lists.bulkCreate(lists, { transaction: t }).then(() => {
                    return retro;
                });
                
            });

        }).then(resT => {
            return res.status(200).send(resT);
        }).catch(err => next(createError(err)));

    }).catch(err => next(createError(err)));
};

exports.addMember = function (req, res, next) {
    let memberId = req.body.memberId;
    let obj = usersMock.find(user => user.id === parseInt(memberId));
    res.set('Location', 'http://localhost:3000/retro/1/members/' + memberId);
    if (retroMock[req.params.id] && obj) res.status(200).send(obj);
    else return next(createError(404));
};

exports.update = function (req, res, next) {
    let obj = retroMock.find(retro => retro.id === parseInt(req.params.id));

    res.set('Location', 'http://localhost:3000/retro/' + req.params.id);

    if (obj) res.status(204).send();
    else return next(createError(404));
};

exports.sortLists = function (req, res, next) {
    let obj = retroMock.find(retro => retro.id === parseInt(req.params.id));

    res.set('Location', 'http://localhost:3000/retro/' + req.params.id + '/lists');

    if (obj) res.status(204).send();
    else return next(createError(404));
};

exports.sortCards = function (req, res, next) {
    let obj = retroMock.find(retro => retro.id === parseInt(req.params.id));

    res.set('Location', 'http://localhost:3000/retro/' + req.params.id + '/cards');

    if (obj) res.status(204).send();
    else return next(createError(404));
};

exports.removeMember = function (req, res, next) {
    let retroObj = retroMock.find(retro => retro.id === parseInt(req.params.retroId));
    let userObj = usersMock.find(user => user.id === parseInt(req.params.userId));
    if (retroObj && userObj) res.status(204).send();
    else return next(createError(404));
};