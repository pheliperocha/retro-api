'use strict';

const Schema = require('../db/schemas/retros');

module.exports = (sequelize, DataTypes) => {
    const Retros = sequelize.define(
        Schema.name,
        Schema.definition(DataTypes, sequelize),
        {});
    Retros.associate = function(models) {
        Retros.belongsTo(models.Users);
    };
    return Retros;
};