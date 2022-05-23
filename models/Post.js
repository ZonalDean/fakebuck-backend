const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define(
        'Post', {
        title: DataTypes.STRING,
        image: DataTypes.STRING,
        like: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            default: 0
        }
    },
        {
            underscored: true
        }
    )

    return Post
}