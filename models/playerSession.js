'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class PlayerSession extends Model {
    static associate(models) {
      PlayerSession.belongsTo(models.User, { foreignKey: 'playerId', as: 'player' });
      PlayerSession.belongsTo(models.Session, { foreignKey: 'sessionId', as: 'session' });
    }
  }
  PlayerSession.init(
    {
      playerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      sessionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Sessions',
          key: 'id',
        },
      },
      userId: {  // Add this field
        type: DataTypes.INTEGER,
        allowNull: true,  // Set to false if required
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      SportId: {  // Add this field
        type: DataTypes.INTEGER,
        allowNull: true,  // Set to false if required
        references: {
          model: 'Users',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'PlayerSession',
      tableName: 'PlayerSessions',
    }
  );
  

  return PlayerSession;
};
