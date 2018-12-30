'use strict';

const Schema = require('../db/schemas/retros');

module.exports = (sequelize, DataTypes) => {
    const Retros = sequelize.define(
        Schema.name,
        Schema.definition(DataTypes, sequelize),
        {});
    Retros.associate = function(models) {
        Retros.belongsTo(models.Users, { as: 'Facilitator', foreignKey: 'userId' });

        Retros.belongsToMany(models.Users, {
            through: 'Members',
            as: 'members',
            foreignKey: 'retroId'
        });

        Retros.hasMany(models.Lists, {
            foreignKey: 'retroId'
        });

        Retros.hasMany(models.Cards, {
            foreignKey: 'retroId'
        });

        Retros.hasMany(models.Annotations, {
            foreignKey: 'retroId'
        });
    };
    return Retros;
};