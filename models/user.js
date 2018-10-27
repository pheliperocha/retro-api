'use strict';

const Schema = require('../db/schemas/users');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        Schema.name,
        Schema.definition(DataTypes),
        {});
    User.associate = function() {};
    return User;
};