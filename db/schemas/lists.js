'use strict';

module.exports = {
    name: 'Lists',
    definition : function(DataTypes, Sequelize = null)  {
        if (Sequelize === null) Sequelize = DataTypes;

        return {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER.UNSIGNED
            },
            retroId: {
                allowNull: false,
                type: DataTypes.INTEGER.UNSIGNED
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            position: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            status: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        };
    }
};