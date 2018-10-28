'use strict';

const Schema = require('../db/schemas/members');

module.exports = (sequelize, DataTypes) => {
    const Retros = sequelize.define(
        Schema.name,
        Schema.definition(DataTypes),
        {
            timestamps: false
        });
    Retros.associate = function() {};
    return Retros;
};