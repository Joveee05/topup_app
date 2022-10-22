const app = require('./app');

const dotenv = require('dotenv');
const User = require('./models/userModel');
const mysql = require('mysql');
const Sequelize = require('sequelize');
const DB = require('./database');

dotenv.config({ path: './config.env' });

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('Uncaught Exception...');
  process.exit(1);
});

// const DB = mysql.createConnection({
//   host: "localhost",
//   database: "truth",
//   user: process.env.USER,
//   password: process.env.PASSWORD,
// });

DB.authenticate()
  .then(() => console.log('Database Connected...'))
  .catch((err) => console.log('Error: ' + err));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
  // DB.connect(() => {
  //   console.log("MySQL Connected Successfully...");
  // });
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('Shutting Down...');
  server.close(() => {
    process.exit(1);
  });
});
