'use strict';

const Schema = require('../db/schemas/lists');

module.exports = (sequelize, DataTypes) => {
    const Lists = sequelize.define(
        Schema.name,
        Schema.definition(DataTypes, sequelize),
        {});
    Lists.associate = function(models) {
        Lists.belongsTo(models.Retros);
    };
    return Lists;
};