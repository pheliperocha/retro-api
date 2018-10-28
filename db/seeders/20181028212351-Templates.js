'use strict';

const TemplatesMock = require('../../mocks/template.mock');

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert('Templates', TemplatesMock, {});
    },
    down: (queryInterface) => {
        return queryInterface.bulkDelete('Templates', null, {});
    }
};
