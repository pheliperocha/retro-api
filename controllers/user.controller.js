const retroMock = require('../mocks/retro.mock');

const createError = require('http-errors');

const Users = require('../models/index').Users;
const Annotations = require('../models/index').Annotations;
const Retros = require('../models/index').Retros;
const Cards = require('../models/index').Cards;

const jwt = require('jsonwebtoken');
const request = require('request');

exports.getRetro = function(req, res) {
    res.status(200).send(retroMock);
};

exports.getActions = function(req, res, next) {
    Users.findByPk(req.user.id, {
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
        if (obj) res.status(200).send(obj.responsibleFor);
        else return next(createError(404));
    }).catch(err => {
        return next(createError(err));
    });

};

exports.login = function(req, res, next) {
    const inAccessTokenUrl = 'https://www.linkedin.com/uas/oauth2/accessToken';
    const inPeopleApiUrl = 'https://api.linkedin.com/v1/people/~:(id,first-name,last-name,email-address,picture-url)';

    const params = {
        code: req.body.code,
        client_id: req.body.clientId,
        client_secret: process.env.LINKEDIN_SECRET,
        redirect_uri: req.body.redirectUri,
        grant_type: 'authorization_code'
    };

    request.post(inAccessTokenUrl, { form: params, json: true }, function (err, inRes, body) {
        if (err) { return next(createError(err)); }

        if (inRes.statusCode !== 200) {
            return next(createError(inRes.statusCode, body.error_description));
        }

        const params = {
            oauth2_access_token: body.access_token,
            format: 'json'
        };

        request.get({ url: inPeopleApiUrl, qs: params, json: true }, function (err, inPeoRes, profile) {
            if (err) { return next(createError(err)); }

            const user = {
                firstname: profile.firstName,
                lastname: profile.lastName,
                email: profile.emailAddress,
                image: profile.pictureUrl,
                linkedinId: profile.id,
            };

            _findOrCreateUserByEmail(user, (err, tokenRes) => {
                if (err) { return next(createError(err)); }
                return res.status(200).send(tokenRes);
            });

        });
    });
    
};

const _createUserJwt = function (user) {
    const payload = {
        id: user.id,
        email: user.email
    };

    return jwt.sign(payload, process.env.SECRETY_KEY, { expiresIn: '7d', algorithm: 'HS256' });
};

const _findOrCreateUserByEmail = function(user, _cb) {
    Users.findOne({
        where: [{ email: user.email }]
    }).then(existingUser => {

        if (existingUser) {
            const token = _createUserJwt(existingUser);

            return _cb(null, {
                token: token,
                user: existingUser.dataValues
            });
        } else {
            Users.create(user)
                .then(userCreated => {
                    const newUser = {
                        id: userCreated.id,
                        email: userCreated.emailAddress,
                    };

                    const token = _createUserJwt(newUser);

                    return _cb(null, {
                        token: token,
                        user: userCreated.dataValues
                    });
                }).catch(err => {
                    return _cb(err);
                });
        }

    }).catch(err => {
        return _cb(err);
    });
};