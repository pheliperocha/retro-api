'use strict';

const Schema = require('../db/schemas/annotation-responsibles');

module.exports = (sequelize, DataTypes) => {
    const AnnotationResponsibles = sequelize.define(
        Schema.name,
        Schema.definition(DataTypes, sequelize),
        {});
    AnnotationResponsibles.associate = function() {};
    return AnnotationResponsibles;
};