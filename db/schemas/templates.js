'use strict';

module.exports = {
    name: 'Templates',
    definition : function(DataTypes, Sequelize = null)  {
        if (Sequelize === null) Sequelize = DataTypes;

        return {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER.UNSIGNED
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            image: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            structure: {
                type: DataTypes.TEXT,
                allowNull: false,
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