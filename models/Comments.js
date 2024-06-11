const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Pothole = require('./pothole');
const Users = require('./User');

class Comments extends Model {}

Comments.init(
  {
    comments_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },   
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model:`users`,
        key: `id`,
      }
    },   
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Define the foreign key column
    pothole_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'pothole', // This is the name of the table
        key: 'pothole_id' // This is the name of the column in the Pothole table
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comments'
  }
);

// Define the association with the Pothole and users models
Comments.belongsTo(Pothole, {
  foreignKey: 'pothole_id',
  onDelete: 'CASCADE' // If a Pothole is deleted, delete its associated Comments
});
Comments.belongsTo(Users, {
  foreignKey: 'pothole_id',
  onDelete: 'CASCADE' 
});

module.exports = Comments;
