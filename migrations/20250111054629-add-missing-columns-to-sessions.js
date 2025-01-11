'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Check if the column 'team1' exists before adding it
    const columns = await queryInterface.describeTable('Sessions');

    if (!columns.team1) {
      await queryInterface.addColumn('Sessions', 'team1', {
        type: Sequelize.STRING,
      });
    }

    if (!columns.team2) {
      await queryInterface.addColumn('Sessions', 'team2', {
        type: Sequelize.STRING,
      });
    }

    if (!columns.venue) {
      await queryInterface.addColumn('Sessions', 'venue', {
        type: Sequelize.STRING,
        allowNull: false,
      });
    }

    if (!columns.date) {
      await queryInterface.addColumn('Sessions', 'date', {
        type: Sequelize.DATEONLY,
        allowNull: false,
      });
    }

    if (!columns.time) {
      await queryInterface.addColumn('Sessions', 'time', {
        type: Sequelize.TIME,
        allowNull: false,
      });
    }

    if (!columns.status) {
      await queryInterface.addColumn('Sessions', 'status', {
        type: Sequelize.ENUM('scheduled', 'canceled'),
        defaultValue: 'scheduled',
      });
    }

    if (!columns.cancellationReason) {
      await queryInterface.addColumn('Sessions', 'cancellationReason', {
        type: Sequelize.STRING,
      });
    }

    // Add startTime and endTime if they don't exist
    if (!columns.startTime) {
      await queryInterface.addColumn('Sessions', 'startTime', {
        type: Sequelize.DATE,
        allowNull: false,
      });
    }

    if (!columns.endTime) {
      await queryInterface.addColumn('Sessions', 'endTime', {
        type: Sequelize.DATE,
        allowNull: false,
      });
    }
  },

  async down (queryInterface, Sequelize) {
    // Removing the columns added
    await queryInterface.removeColumn('Sessions', 'team1');
    await queryInterface.removeColumn('Sessions', 'team2');
    await queryInterface.removeColumn('Sessions', 'venue');
    await queryInterface.removeColumn('Sessions', 'date');
    await queryInterface.removeColumn('Sessions', 'time');
    await queryInterface.removeColumn('Sessions', 'status');
    await queryInterface.removeColumn('Sessions', 'cancellationReason');

    // Removing startTime and endTime if they were added
    await queryInterface.removeColumn('Sessions', 'startTime');
    await queryInterface.removeColumn('Sessions', 'endTime');
  }
};
