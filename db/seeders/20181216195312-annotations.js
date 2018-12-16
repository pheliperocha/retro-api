'use strict';

const AnnotationMock = require('../../mocks/annotation.mock');

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert('Annotations', AnnotationMock, {});
    },
    down: (queryInterface) => {
        return queryInterface.bulkDelete('Annotations', null, {});
    }
};
