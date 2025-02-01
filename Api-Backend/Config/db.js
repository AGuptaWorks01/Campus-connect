// Import the promise-compatible version of mysql2
const mysql = require('mysql2/promise');

// Create a MySQL connection pool using the promise wrapper
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root@123', // Ensure that you have your correct password
    database: '', // Updated database name to 'Campus_Connect'
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: false
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
        await pool.query('CREATE DATABASE IF NOT EXISTS Campus_Connect'); // Ensure 'Campus_Connect' database exists
        console.log('Database ensured: Campus_Connect');
    } catch (err) {
        console.error('Error ensuring database creation:', err);
    }
};

// Create the necessary tables inside the 'Campus_Connect' database
const createTablesIfNotExists = async () => {
    try {
        await pool.query('USE Campus_Connect'); // Switch to 'Campus_Connect' database
        await pool.query(`
            CREATE TABLE IF NOT EXISTS students (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255),
                department VARCHAR(50),
                year VARCHAR(50),
                image TEXT,
                company_name VARCHAR(255),
                employee VARCHAR(255),
                branch VARCHAR(50),
                degree VARCHAR(50),
                batch VARCHAR(10),
                stipend VARCHAR(50)
            );
        `);
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users ( 
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        await pool.query(`
            CREATE TABLE IF NOT EXISTS feedbacks (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
                review TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('Tables created or ensured.');
    } catch (err) {
        console.error('Error creating tables:', err);
    }
};

// Call the functions
createDatabaseIfNotExists();
createTablesIfNotExists();
testConnection();

// Export the pool for use in other files
module.exports = pool;
