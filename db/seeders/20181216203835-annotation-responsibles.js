'use strict';

const annotationResponsibleMock = require('../../mocks/annotation-responsible.mock');

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert('AnnotationResponsibles', annotationResponsibleMock, {});
    },
    down: (queryInterface) => {
        return queryInterface.bulkDelete('AnnotationResponsibles', null, {});
    }
};
