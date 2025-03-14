const mysql = require("mysql2");
const { dbHost, dbPort, dbUser, dbPass, dbName } = require("../constants");

const pool = mysql.createPool({
  host: dbHost,
  port: dbPort,
  user: dbUser,
  password: dbPass,
  database: dbName,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool.promise();