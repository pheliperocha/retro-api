'use strict';

const Schema = require('../db/schemas/templates');

module.exports = (sequelize, DataTypes) => {
    const Template = sequelize.define(
        Schema.name,
        Schema.definition(DataTypes, sequelize),
        {});
    Template.associate = function() {};
    return Template;
};