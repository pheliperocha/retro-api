'use strict';

const Schema = require('../db/schemas/members');

module.exports = (sequelize, DataTypes) => {
    const Members = sequelize.define(
        Schema.name,
        Schema.definition(DataTypes),
        {
            timestamps: false
        });
    Members.associate = function() {};
    return Members;
};