const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define(
        'Like', {
        
    },
        {
            underscored: true
        }
    )

    return Like
}