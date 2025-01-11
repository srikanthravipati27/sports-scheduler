'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Sessions', 'availableSpots', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0, // Optional: Default to 0 if you want new sessions to have 0 spots by default
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Sessions', 'availableSpots');
  }
};
