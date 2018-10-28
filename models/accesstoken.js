'use strict';

const Schema = require('../db/schemas/accesstokens');

module.exports = (sequelize, DataTypes) => {
    const accessToken = sequelize.define(
        Schema.name,
        Schema.definition(DataTypes, sequelize),
        {
            timestamps: false
        });
    accessToken.associate = function(models) {
        accessToken.belongsTo(models.Users);
    };
    return accessToken;
};