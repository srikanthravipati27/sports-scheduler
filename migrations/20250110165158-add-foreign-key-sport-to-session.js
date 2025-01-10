'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableDescription = await queryInterface.describeTable('Sessions');

    if (!tableDescription.sportId) {
      await queryInterface.addColumn('Sessions', 'sportId', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Sports',
          key: 'id',
        },
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Sessions', 'sportId');
  },
};
