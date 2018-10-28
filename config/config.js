'use strict';

module.exports = {
    'development': {
        db: {
            'username': process.env.DB_USERNAME,
            'password': process.env.DB_PASSWORD,
            'database': process.env.DB_NAME,
            'host': process.env.DB_HOST,
            'dialect': 'mysql'
        }
    },
    'test': {
        db: {
            'username': '',
            'password': '',
            'database': '',
            'host': '',
            'dialect': 'sqlite',
            'storage': './db/database.sqlite'
        }
    },
    'staging': {},
    'production': {}
};