// Create Databse
CREATE DATABASE campus_connect;

// then create Student info table
USE campus_connect;

CREATE TABLE students (
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

// then create user table for login register

CREATE TABLE users (
id INT AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(255) NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL,
createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);





// api for insert student info
http://localhost:3000/api/students/insert-student

// api for get all students
http://localhost:3000/api/students/students

// api for register user
http://localhost:3000/api/auth/register

// api for login user
http://localhost:3000/api/auth/login




