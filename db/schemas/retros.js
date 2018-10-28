'use strict';

module.exports = {
    name: 'Retros',
    definition : function(DataTypes, Sequelize = null)  {
        if (Sequelize === null) Sequelize = DataTypes;

        return {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER.UNSIGNED
            },
            userId: {
                allowNull: false,
                type: DataTypes.INTEGER.UNSIGNED
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            context: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            image: {
                type: DataTypes.TEXT
            },
            pin: {
                type: DataTypes.INTEGER,
            },
            state: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1
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