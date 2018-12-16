'use strict';

const Schema = require('../db/schemas/annotations');

module.exports = (sequelize, DataTypes) => {
    const Annotations = sequelize.define(
        Schema.name,
        Schema.definition(DataTypes, sequelize),
        {});
    Annotations.associate = function(models) {
        Annotations.belongsTo(models.Retros);
        Annotations.belongsTo(models.Cards);
        Annotations.belongsTo(models.Users);
    };
    return Annotations;
};