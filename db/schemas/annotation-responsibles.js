'use strict';

module.exports = {
    name: 'AnnotationResponsibles',
    definition : function(DataTypes, Sequelize = null)  {
        if (Sequelize === null) Sequelize = DataTypes;

        return {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER.UNSIGNED
            },
            annotationId: {
                allowNull: false,
                type: DataTypes.INTEGER.UNSIGNED
            },
            userId: {
                allowNull: false,
                type: DataTypes.INTEGER.UNSIGNED
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