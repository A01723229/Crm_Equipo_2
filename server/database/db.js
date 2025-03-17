const sql = require("mssql");
const { dbHost, dbUser, dbPass, dbName } = require("../constants");

const config = {
  user: dbUser,
  password: dbPass,
  server: dbHost, 
  database: dbName,
  options: {
    encrypt: false, // Set to false if not using SSL
    trustServerCertificate: true, // Needed for self-signed certs
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
