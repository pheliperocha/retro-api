'use strict';

const UserMock = require('../../mocks/user.mock');

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert('Users', UserMock, {});
    },
    down: (queryInterface) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};
