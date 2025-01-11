// PlayerSession model
'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class PlayerSession extends Model {
    static associate(models) {
      // Correct the associations
      PlayerSession.belongsTo(models.User, { foreignKey: 'userId', as: 'player' });
      PlayerSession.belongsTo(models.Session, { foreignKey: 'sessionId', as: 'session' });
    }
  }

  PlayerSession.init(
    {
      userId: {  // Foreign key for the User model (player)
        type: DataTypes.INTEGER,
        allowNull: false,  // Set to false if required
        references: {
          model: 'Users',
          key: 'id',
        },
        field: 'userId',
      },
      sessionId: {  // Foreign key for the Session model
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Sessions',
          key: 'id',
        },
      },
      SportId: {  // Add this field for Sport association if needed
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Sports',
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
