'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        firstname: DataTypes.STRING,
        lastname: DataTypes.STRING,
        email: DataTypes.STRING,
        image: DataTypes.STRING,
        linkedinId: DataTypes.INTEGER,
        status: DataTypes.BOOLEAN
    }, {});
    User.associate = function() {};
    return User;
};