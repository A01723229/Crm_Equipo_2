const sql = require("mssql");
const { dbHost, dbUser, dbPass, dbName } = require("../constants.js");

const config = {
  user: dbUser,
  password: dbPass,
  server: dbHost,
  database: dbName,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log("Connected to SQL Server");
    return pool;
  })
  .catch(err => {
    console.error("Database connection failed", err);
    process.exit(1);
  });

module.exports = {
  sql,
  poolPromise,
};
