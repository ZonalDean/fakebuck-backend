const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        phoneNumber: {
            type: DataTypes.STRING,
            unique: true,
        },
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

    User.associate = models => {

        // POST ASSOCIAITON
        User.hasMany(models.Post, {
            foreignKey: {
                name: 'userId',
                allowNull: false,
            },
            onUpdate: 'RESTRICT',
            onDelete: 'RESTRICT'
        });

        // COMMENT ASSOCIATION
        User.hasMany(models.Comment, {
            foreignKey: {
                name: 'userId',
                allowNull: false,
            },
            onUpdate: 'RESTRICT',
            onDelete: 'RESTRICT'
        });

        // LIKE ASSOCIATION
        User.hasMany(models.Like, {
            foreignKey: {
                name: 'userId',
                allowNull: false,
            },
            onUpdate: 'RESTRICT',
            onDelete: 'RESTRICT'
        });

        // FRIENDS ASSOCIATION includes as to prevent overwrites
        User.hasMany(models.Friend, {
            as: 'RequestFrom',
            foreignKey: {
                name: 'requestFromId',
                allowNull: false,
            },
            onUpdate: 'RESTRICT',
            onDelete: 'RESTRICT'
        });
        User.hasMany(models.Friend, {
            as: 'RequestTo',
            foreignKey: {
                name: 'requestToId',
                allowNull: false,
            },
            onUpdate: 'RESTRICT',
            onDelete: 'RESTRICT'
        });

    }
    return User
}