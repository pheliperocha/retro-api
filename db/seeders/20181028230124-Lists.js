'use strict';

const ListsMock = require('../../mocks/list.mock');

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert('Lists', ListsMock, {});
    },
    down: (queryInterface) => {
        return queryInterface.bulkDelete('Lists', null, {});
    }
};
