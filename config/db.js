var Sequelize = require('sequelize');

const db = new Sequelize('passport', 'postgres', '', {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  operatorsAliases: Sequelize.Op,
  protocol: null,
  logging: false,
})

module.exports = db;