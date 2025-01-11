'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Remove the 'date' and 'time' columns from the 'Sessions' table
    await queryInterface.removeColumn('Sessions', 'date');
    await queryInterface.removeColumn('Sessions', 'time');
  },

  down: async (queryInterface, Sequelize) => {
    // Add the 'date' and 'time' columns back in case we need to rollback
    await queryInterface.addColumn('Sessions', 'date', {
      type: Sequelize.DATE,
      allowNull: true,  // Adjust based on your previous column settings
    });
    await queryInterface.addColumn('Sessions', 'time', {
      type: Sequelize.TIME,
      allowNull: true,  // Adjust based on your previous column settings
    });
  }
};
