'use strict';

const Schema = require('../schemas/retros');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable(
            Schema.name,
            Schema.definition(Sequelize)
        );
    },
    down: (queryInterface) => {
        return queryInterface.dropTable(Schema.name);
    }
};