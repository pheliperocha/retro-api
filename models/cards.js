'use strict';

const Schema = require('../db/schemas/cards');

module.exports = (sequelize, DataTypes) => {
    const Cards = sequelize.define(
        Schema.name,
        Schema.definition(DataTypes, sequelize),
        {});
    Cards.associate = function(models) {
        Cards.belongsTo(models.Retros);
        Cards.belongsTo(models.Lists);
        Cards.belongsTo(models.Users);

        Cards.hasMany(models.CardVotes, {
            foreignKey: 'cardId'
        });

        Cards.hasMany(models.Annotations, {
            foreignKey: 'cardId'
        });
    };
    return Cards;
};