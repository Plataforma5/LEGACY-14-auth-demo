const Sequelize = require("sequelize");

const db = new Sequelize("postgres://postgres@localhost/passport_demo", {
  logging: false,
  dialect: "postgres",
});

module.exports = db;
