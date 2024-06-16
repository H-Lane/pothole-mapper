const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const Comment = require("./Comments");
const User = require("./User");

class Pothole extends Model {}

Pothole.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    size: {
      type: DataTypes.STRING,
    },
    lat: {
      type: DataTypes.STRING,
    },
    lng: {
      type: DataTypes.STRING,
    },
    fixed: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: `user`,
        key: `id`,
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "pothole",
  }
);

module.exports = Pothole;
