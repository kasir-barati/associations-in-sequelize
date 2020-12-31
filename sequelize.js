const { Sequelize } = require("sequelize");

const _sequelize = new Sequelize({
  dialect: "postgres",
  username: "root",
  password: "123456789",
  host: "localhost",
  port: 30003,
  database: "test",
});

module.exports.getSeq = () => _sequelize ?? null;
