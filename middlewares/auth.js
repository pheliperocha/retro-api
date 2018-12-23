'use strict';

const jwt = require('jsonwebtoken'),
    createError = require('http-errors');

const auth = (req, res, next) => {
    const authCode = req.headers.authorization;

    if (!authCode) {
        return next(createError(401));
    }

    const tokenArray = authCode.split(' ');

    if (!tokenArray[1]) {
        return next(createError(401));
    }

    jwt.verify(tokenArray[1], process.env.SECRETY_KEY, (err, decoded) => {
        if (err) { return next(createError(401, err)); }
        req.user = decoded;
        next();
    });
};

module.exports = auth;