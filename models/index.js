const Pothole = require(`./pothole`);
const User = require(`./User`);
const Comments = require(`./Comments`);

// Define associations with Pothole and Comments models
User.hasMany(Pothole, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

User.hasMany(Comments, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// Define association with the Comment model
Pothole.hasMany(Comments, {
  foreignKey: "pothole_id",
  onDelete: "CASCADE", // If a Pothole is deleted, delete its associated Comments
});
Pothole.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// Define the association with the Pothole and users models
Comments.belongsTo(Pothole, {
  foreignKey: "pothole_id",
  onDelete: "CASCADE", // If a Pothole is deleted, delete its associated Comments
});
Comments.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

module.exports = { Pothole, User, Comments };
