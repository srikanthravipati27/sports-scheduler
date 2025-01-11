module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Since the PlayerSession table is already handling the many-to-many relationship,
    // we don't need to modify the database schema, just update the model definition.
    
    // No need to make any changes in the schema, but here you can remove or update
    // any references to the old 'hasMany' relationship in your User model.
    // As you stated, PlayerSession already exists.

    // Example of updating relationships in the model
    // This will be done directly in the User model file, not in this migration
  },

  down: async (queryInterface, Sequelize) => {
    // In case you want to revert the changes, restore the previous `hasMany` relationship.
    // But this doesn't affect the schema either since we are only modifying the Sequelize models.
    
    // No changes to the database schema, so this is a no-op.
  }
};
