'use strict';

module.exports = {
    name: 'AccessTokens',
    definition : function(DataTypes, Sequelize = null)  {
        if (Sequelize === null) Sequelize = DataTypes;

        return {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER.UNSIGNED
            },
            ttl: {
                allowNull: false,
                type: DataTypes.INTEGER
            },
            userId: {
                allowNull: false,
                type: DataTypes.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        };
    }
};