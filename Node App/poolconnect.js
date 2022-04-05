const mysql = require('mysql2');
require('dotenv').config();
console.log(process.env.host);
const pool = mysql.createPool({
  host: process.env.host,
  user: process.env.user,
  database: process.env.database,
  password: process.env.password,
  waitForConnections: process.env.waitForConnections,
  connectionLimit: process.env.connectionLimit,
  queueLimit: process.env.queueLimit,
});
module.exports = pool;
