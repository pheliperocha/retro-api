/* eslint-disable no-unused-vars */

function errorHandler(err, req, res, next) {
    res.status(err.status).send({
        'errors': [{
            'status': err.status,
            'message': err.message,
        }]
    });
}

module.exports = errorHandler;