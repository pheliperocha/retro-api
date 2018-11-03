'use strict';

const ListsMock = require('../../mocks/card.mock');

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert('Cards', ListsMock, {});
    },
    down: (queryInterface) => {
        return queryInterface.bulkDelete('Cards', null, {});
    }
};
