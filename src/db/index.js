const Sequelize = require("sequelize");

const db = new Sequelize("auth", "postgres", "1234", {
  host: "localhost",
  logging: false,
  dialect: "postgres",
});

module.exports = db;
