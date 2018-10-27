require('dotenv-safe').config();
require('./config/index');

const express = require('express'),
    createError = require('http-errors'),
    errorHandler = require('./errorHandler'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan'),
    cors = require('cors'),
    router = require('./routes'),
    io = require('socket.io')(),
    app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.io = io;

const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./config/swagger.json');

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(router);

app.use(function(req, res, next) {
    next(createError(404));
});

app.use(errorHandler);

module.exports = app;
