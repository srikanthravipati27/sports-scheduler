'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add userId column back with a foreign key constraint
    await queryInterface.addColumn('PlayerSessions', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',  // Reference to the Users table
        key: 'id',       // Foreign key points to the 'id' column in Users table
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // If we need to revert, remove the userId column
    await queryInterface.removeColumn('PlayerSessions', 'userId');
  }
};
