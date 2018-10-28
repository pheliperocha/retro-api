'use strict';

const AccessTokensMock = require('../../mocks/accessToken.mock');

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert('AccessTokens', AccessTokensMock, {});
    },
    down: (queryInterface) => {
        return queryInterface.bulkDelete('AccessTokens', null, {});
    }
};