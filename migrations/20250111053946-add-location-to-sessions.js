'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Sessions', 'location', {
      type: Sequelize.STRING,
      allowNull: false, // Set to true if the column can be null
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Sessions', 'location');
  },
};
