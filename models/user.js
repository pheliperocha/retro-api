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
    };
    return User;
};