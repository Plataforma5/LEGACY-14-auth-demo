var Sequelize = require('sequelize');

const db = new Sequelize('postgres://postgres@localhost/passportnew', {
  logging: false,
  dialect: 'postgres'
});

module.exports = db;
