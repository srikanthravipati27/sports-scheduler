'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define associations here

      // A User can create multiple Sessions
      this.hasMany(models.Session, { 
        foreignKey: 'creatorId', 
        as: 'sessions' 
      });

      // Example: If Users can also belong to Sports
      this.belongsToMany(models.Sport, { 
        through: models.PlayerSession, 
        foreignKey: 'userId', 
        as: 'sports' 
      });
    }
  }

  // Initialize the User model
  User.init(
    {
      Name: {
        type: DataTypes.STRING,
        allowNull: false, // Name is required
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false, // Email is required
        unique: true, // Email should be unique
        validate: {
          isEmail: true, // Validate proper email format
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false, // Role is required
        validate: {
          isIn: [['admin', 'player', 'coach']], // Restrict roles to predefined values
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false, // Password is required
        validate: {
          len: [6, 100], // Password must be at least 6 characters
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users', // Explicit table name
      timestamps: true, // Enables createdAt and updatedAt
    }
  );

  return User;
};
