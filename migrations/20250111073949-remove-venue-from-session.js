'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Remove the 'venue' column from the 'Sessions' table
    await queryInterface.removeColumn('Sessions', 'venue');
  },

  down: async (queryInterface, Sequelize) => {
    // Add the 'venue' column back in case we need to rollback
    await queryInterface.addColumn('Sessions', 'venue', {
      type: Sequelize.STRING,
      allowNull: true,  // Adjust based on your previous column settings
    });
  }
};
