const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const DB = new Sequelize({
  host: 'localhost',
  database: process.env.database,
  username: process.env.USER,
  password: process.env.PASSWORD,
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = DB;
