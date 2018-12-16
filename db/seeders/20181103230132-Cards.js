'use strict';

const CardMock = require('../../mocks/card.mock');

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert('Cards', CardMock, {});
    },
    down: (queryInterface) => {
        return queryInterface.bulkDelete('Cards', null, {});
    }
};
