const Sequelize = require("sequelize");

const db = new Sequelize("postgres://postgres@postgres/passport_demo", {
  logging: false,
  dialect: "postgres",
});

module.exports = db;
