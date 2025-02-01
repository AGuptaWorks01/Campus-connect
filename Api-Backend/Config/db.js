require("dotenv").config();
// Import the promise-compatible version of mysql2
const mysql = require("mysql2/promise"); // Use promise-based version

// Create a MySQL connection pool using the promise wrapper
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: false,
});

// Function to check the database connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection(); // Get a connection
    console.log("Connected to the MySQL database.");
    connection.release(); // Release the connection back to the pool
  } catch (err) {
    console.error(
      `Error connecting to the database: ${err.code} - ${err.message}`
    );
    process.exit(1); // Exit the app if DB connection fails
  }
};

// Ensure the database exists and create it if necessary
const createDatabaseIfNotExists = async () => {
  try {
    await pool.query("CREATE DATABASE IF NOT EXISTS Campus_Connect"); // Ensure 'Campus_Connect' database exists
    console.log("Database ensured: Campus_Connect");
  } catch (err) {
    console.error("Error ensuring database creation:", err);
    process.exit(1); // Exit the app if DB creation fails
  }
};

const createTablesIfNotExists = async () => {
  try {
    await pool.query("USE Campus_Connect"); // Switch to 'Campus_Connect' database

    // Begin a transaction to ensure tables are created atomically
    await pool.query("START TRANSACTION");

    // Create the users table first
    await pool.query(`
            CREATE TABLE IF NOT EXISTS users ( 
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

    // Now create the students table with foreign key constraint
    await pool.query(`
            CREATE TABLE IF NOT EXISTS students (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255),
                branch VARCHAR(50),
                year VARCHAR(50),
                company_name VARCHAR(255),
                employee_type VARCHAR(255),
                image TEXT,
                linkedin VARCHAR(255),
                github VARCHAR(255),
                user_id INT UNIQUE,  -- Ensure each user can only have one student record
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );
        `);

    // Create feedback table
    await pool.query(`
            CREATE TABLE IF NOT EXISTS feedbacks (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
                review TEXT NOT NULL,
                user_id INT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );
        `);

    // Commit the transaction if everything is successful
    await pool.query("COMMIT");
    console.log("Tables created or ensured.");
  } catch (err) {
    // If any query fails, rollback the transaction
    await pool.query("ROLLBACK");
    console.error("Error creating tables:", err);
    process.exit(1); // Exit the app if table creation fails
  }
};

// Call the functions to ensure DB and tables are ready
const initializeDatabase = async () => {
  await createDatabaseIfNotExists();
  await createTablesIfNotExists();
  await testConnection();
};

// Initialize database setup
initializeDatabase();

// Export the pool for use in other files
module.exports = pool; // Export as a promise-based pool
