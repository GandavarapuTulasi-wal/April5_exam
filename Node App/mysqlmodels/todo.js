const { Sequelize, DataTypes, STRING, DOUBLE } = require('sequelize');
const db = require('../dbsq');
const Product = db.define(
  'todos',
  {
    status: {
      type: DataTypes.BOOLEAN,
    },
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);
module.exports = Product;
