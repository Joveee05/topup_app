const Sequelize = require('sequelize');

const DB = require('../database');

const User = DB.define('truth_users', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'A user must have a name',
      },
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notNull: {
        msg: 'Please enter your email',
      },
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      min: 8,
      notNull: {
        msg: 'Please enter your email',
      },
    },
  },
  balance: {
    type: Sequelize.STRING,
    defaultValue: 0.0,
  },
});

module.exports = User;
