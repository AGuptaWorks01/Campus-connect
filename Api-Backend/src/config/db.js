// Importing the MySQL2 library with promise support
const mysql = require("mysql2/promise");

// Loading environment variables from a .env file into process.env
require("dotenv").config();

// Creating a MySQL connection pool using environment variables
const pool = mysql.createPool({
  host: process.env.DB_HOST || "db", // Database host (e.g., localhost or remote server)
  user: process.env.DB_USER || 'root', // Database username
  password: process.env.DB_PASSWORD || 'root', // Database password
  database: process.env.DB_NAME  || 'campusDB', // Name of the database to connect to
  waitForConnections: true, // Wait for connections instead of throwing an error when the pool is full
  connectionLimit: 10, // Maximum number of connections in the pool
  ssl: false, // SSL disabled (enable in production for secure connection)
  connectTimeout: 10000, // Connection timeout in milliseconds (10 seconds)
});

// Function to test if the database connection is working
async function testConnection() {
  try {
    const connection = await pool.getConnection(); // Get a connection from the pool
    console.log("Database connected successfully!"); // Log success message
    connection.release(); // Release the connection back to the pool
  } catch (error) {
    console.error("Error connecting to the database:", error.message); // Log connection error
  }
}

// Testing the database connection on startup
testConnection();

// Exporting the connection pool so it can be used elsewhere in the application
module.exports = pool;
