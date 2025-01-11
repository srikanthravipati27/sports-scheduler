'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Remove the userId column
    await queryInterface.removeColumn('PlayerSessions', 'userId');
  },

  down: async (queryInterface, Sequelize) => {
    // If we need to revert, add the userId column back
    await queryInterface.addColumn('PlayerSessions', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  }
};
