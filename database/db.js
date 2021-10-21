const { Sequelize } = require("sequelize");
const { HOST, USER, PASSWORD, DATABASE } = require("../config");

const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
  host: HOST,
  dialect: "mysql",
});

module.exports = sequelize;
