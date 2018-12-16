'use strict';

const Schema = require('../db/schemas/users');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        Schema.name,
        Schema.definition(DataTypes, sequelize),
        {});
    User.associate = function(models) {
        User.hasMany(models.AccessTokens, {
            foreignKey: 'userId'
        });

        User.hasMany(models.Retros, {
            foreignKey: 'userId'
        });

        User.belongsToMany(models.Retros, {
            through: 'Members',
            as: 'memberOf',
            foreignKey: 'userId'
        });

        User.hasMany(models.Cards, {
            foreignKey: 'userId'
        });

        User.hasMany(models.CardVotes, {
            foreignKey: 'userId'
        });

        User.hasMany(models.Annotations, {
            foreignKey: 'userId'
        });

        User.belongsToMany(models.Annotations, {
            through: 'AnnotationResponsibles',
            as: 'responsibleFor',
            foreignKey: 'userId'
        });
    };
    return User;
};