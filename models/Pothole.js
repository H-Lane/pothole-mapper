const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Comment = require('./Comments'); 
const User = require('./User'); 

class Pothole extends Model {}

Pothole.init(
  {
    pothole_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    size: {
      type: DataTypes.STRING
    },
    lat: { 
      type: DataTypes.INTEGER
    },
    lng: { 
      type: DataTypes.INTEGER
    },
    fixed: {
      type: DataTypes.BOOLEAN
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model:`users`,
        key: `id`,
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'pothole'
  }
);

// Define association with the Comment model
Pothole.hasMany(Comments, {
  foreignKey: 'pothole_id',
  onDelete: 'CASCADE', // If a Pothole is deleted, delete its associated Comments
});
Pothole.hasOne(User, {
  foreignKey: 'pothole_id',
  onDelete: 'CASCADE', 
});

module.exports = Pothole;
 