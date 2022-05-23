const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define(
        'Comment', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        } 
    },
        {
            underscored: true
        }
    )

    Comment.associate = models => {

        // BELONGS TO USER
        Comment.belongsTo(models.User, {
            foreignKey: {
                name: 'userId',
                allowNull: false,
            },
            onUpdate: 'RESTRICT',
            onDelete: 'RESTRICT'
        });

        // BELONGS TO POST
        Comment.belongsTo(models.Post, {
            foreignKey: {
                name: 'postId',
                allowNull: false,
            },
            onUpdate: 'RESTRICT',
            onDelete: 'RESTRICT'
        });
    }

    return Comment
}