const mysql = require("mysql2/promise");
require("dotenv").config();

// Create a pool that stays connected throughout the app
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true, // Let requests wait for available connection
  connectionLimit: 10, // Maximum connections at a time
  queueLimit: 0, // Unlimited waiting requests
  ssl: false,
  connectTimeout: 10000, // Timeout for initial connection
  // Removed acquireTimeout since it is not supported by mysql2
});

// Initialize and keep connection pool alive for the entire server lifecycle
const initializeConnectionPool = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Connected to MySQL Database using connection pool.");
    connection.release(); // Release after initializing
  } catch (error) {
    console.error("Error initializing MySQL connection pool:", error);
    process.exit(1); // Exit if the connection pool setup fails
  }
};

// Call this function once when the server starts
initializeConnectionPool();

// ---------------------------
// Keep-Alive Mechanism
// ---------------------------

// Set the interval in milliseconds (e.g., 5 minutes)
const keepAliveInterval = 5 * 60 * 1000;

setInterval(async () => {
  try {
    // Get a connection from the pool
    const connection = await pool.getConnection();
    // Ping the database to keep the connection alive
    await connection.ping();
    console.log("Database connection kept alive via ping.");
    // Release the connection back to the pool
    connection.release();
  } catch (error) {
    console.error("Error pinging database:", error);
  }
}, keepAliveInterval);

// Export the pool for use in other parts of the app
module.exports = pool;
