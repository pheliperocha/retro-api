'use strict';

module.exports = {
    name: 'Members',
    definition : function(DataTypes)  {
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
            userId: {
                allowNull: false,
                type: DataTypes.INTEGER.UNSIGNED
            },
            status: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true
            }
        };
    }
};