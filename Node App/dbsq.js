const Sequelize = require('sequelize');
const db = new Sequelize('westsidenode', 'westside', 'westside123', {
  host: 'localhost',
  dialect: 'mysql',
});
module.exports = db;
