const sequelize = require('../config/connection');
const { User, Pothole, Comments } = require('../models');

const userSeedData = require('./userData.json');
const potholeSeedData = require('./potholeSeedData.json');
const commentSeedData = require('./commentsSeedData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // Seed Users
  const user = await User.bulkCreate(userSeedData);

  // Seed Potholes
  const potholes = await Pothole.bulkCreate(potholeSeedData);

  // Seed Comments
  const comment = await Comments.bulkCreate(commentSeedData);
  };
{
  process.exit(0);
};

seedDatabase();
