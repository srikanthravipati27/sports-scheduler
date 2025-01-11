module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Remove the old foreign key if exists
    

    // Add the new foreign key
    await queryInterface.addConstraint('PlayerSessions', {
      fields: ['userId'],  // This is the field in PlayerSessions table
      type: 'foreign key',
      name: 'PlayerSessions_userId_fkey',  // Name of the constraint
      references: {
        table: 'Users',  // The table that PlayerSession is referencing
        field: 'id',     // The field in the Users table that PlayerSession references
      },
      onDelete: 'CASCADE',  // Optional: Action when the referenced record is deleted
      onUpdate: 'CASCADE',  // Optional: Action when the referenced record is updated
    });
  },

  down: async (queryInterface, Sequelize) => {
    // If we want to undo the migration, remove the foreign key constraint
    await queryInterface.removeConstraint('PlayerSessions', 'PlayerSessions_userId_fkey');
  }
};
