'use strict';

const MembersMock = require('../../mocks/member.mock');

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert('Members', MembersMock, {});
    },
    down: (queryInterface) => {
        return queryInterface.bulkDelete('Members', null, {});
    }
};
