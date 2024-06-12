const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const Pothole = require("./pothole");
const User = require("./User");

class Comments extends Model {}

Comments.init(
  {
    comments_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: `user`,
        key: `id`,
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Define the foreign key column
    pothole_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "pothole", // This is the name of the table
        key: "id", // This is the name of the column in the Pothole table
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "comments",
  }
);

module.exports = Comments;
