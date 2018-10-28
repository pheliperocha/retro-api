'use strict';

const RetrosMock = require('../../mocks/retro.mock');

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert('Retros', RetrosMock, {});
    },
    down: (queryInterface) => {
        return queryInterface.bulkDelete('Retros', null, {});
    }
};
