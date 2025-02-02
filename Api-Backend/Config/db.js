require("dotenv").config();
const mysql = require("mysql2/promise");

// Create a pool with the actual database (Campus_Connect)
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "Campus_Connect", // Directly connect to the Campus_Connect database
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: false,
});

// Test the connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Connected to the MySQL database.");
    connection.release();
  } catch (err) {
    console.error("Error connecting to the database:", err);
    process.exit(1); // Exit if DB connection fails
  }
};

// Run the test connection
testConnection();

// Export the pool for use in other files
module.exports = pool;
