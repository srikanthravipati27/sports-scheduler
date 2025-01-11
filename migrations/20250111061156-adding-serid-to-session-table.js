'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('PlayerSessions', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: true, // Set to false if required
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('PlayerSessions', 'userId');
  }
};
