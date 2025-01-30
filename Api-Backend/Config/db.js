// Import the promise-compatible version of mysql2
const mysql = require('mysql2/promise');

// Create a MySQL connection pool using the promise wrapper
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root@123', // Ensure that you have to your password
    database: '', // Ensure this matches your actual database name
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Function to check the database connection
const testConnection = async () => {
    try {
        const connection = await pool.getConnection(); // Get a connection
        console.log('Connected to the MySQL database.');
        connection.release(); // Release the connection back to the pool
    } catch (err) {
        console.error(`Error connecting to the database: ${err.code} - ${err.message}`);
    }
};

// Ensure the database exists and create it if necessary
const createDatabaseIfNotExists = async () => {
    try {
        await pool.query('CREATE DATABASE IF NOT EXISTS campus_connect');
        console.log('Database ensured: campus_connect');
    } catch (err) {
        console.error('Error ensuring database creation:', err);
    }
};

// Call the functions
createDatabaseIfNotExists();
testConnection();

// Export the pool for use in other files
module.exports = pool;
