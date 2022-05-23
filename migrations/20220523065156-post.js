'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('Post', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.DataTypes.STRING,
      },
      image: {
        type: Sequelize.DataTypes.STRING,
      },
      created_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
      },
      user_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'user'
          },
          key:'id'
        }
      }
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('Post')
  }
};
