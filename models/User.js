const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            }
        },
        phoneNumber: DataTypes.STRING,
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        profilePic: DataTypes.STRING,
        coverPhoto: DataTypes.STRING,
    },
        {
            underscored: true
        }
    )

    return User
}