'use strict';

const Schema = require('../db/schemas/cardvotes');

module.exports = (sequelize, DataTypes) => {
    const CardVotes = sequelize.define(
        Schema.name,
        Schema.definition(DataTypes, sequelize),
        {});
    CardVotes.associate = function(models) {
        CardVotes.belongsTo(models.Cards);
        CardVotes.belongsTo(models.Users);
    };
    return CardVotes;
};