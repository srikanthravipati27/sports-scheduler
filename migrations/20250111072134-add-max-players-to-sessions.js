'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Sessions', 'maxPlayers', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 10, // Optional: Set a default value for max players (e.g., 10)
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Sessions', 'maxPlayers');
  }
};
