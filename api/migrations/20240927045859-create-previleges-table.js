'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('privileges', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users', // Refers to the `users` table
          key: 'id'
        },
        onDelete: 'CASCADE',
        allowNull: false
      },
      can_create_admin_user: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      can_view_purchases: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      can_verify_purchases: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      can_scan: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('privileges');
  }
};
