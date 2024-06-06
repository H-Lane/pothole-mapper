//Bring in the sequelize and dotenv package
const Sequelize = require('sequelize');
require('dotenv').config();

//Initialize a new case of Sequelize with user and password save in .env
const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'postgres',
    }
  );

module.exports = sequelize;