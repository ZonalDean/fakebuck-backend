const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Friend = sequelize.define(
        'Friend', {
        status: {
            type: DataTypes.ENUM('ACCEPTED', 'PENDING'),
            allowNull: false,
            defaultValue: 'PENDING'
        }
    },
        {
            underscored: true
        }
    )

    Friend.associate = models => {

        // REQUEST TO
        Friend.belongsTo(models.User, {
            as: 'RequestFrom',
            foreignKey: {
                name: 'requestFromId',
                allowNull: false,
            },
            onUpdate: 'RESTRICT',
            onDelete: 'RESTRICT'
        });

        // REQUEST FROM
        Friend.belongsTo(models.User, {
            as: 'RequestTo',
            foreignKey: {
                name: 'requestToId',
                allowNull: false,
            },
            onUpdate: 'RESTRICT',
            onDelete: 'RESTRICT'
        });
    }

    return Friend
}