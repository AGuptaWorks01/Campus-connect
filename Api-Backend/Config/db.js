const mysql = require("mysql2/promise");
require("dotenv").config();

// Create and export the database connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  ssl: false,
  connectTimeout: 10000,
});

module.exports = pool;



