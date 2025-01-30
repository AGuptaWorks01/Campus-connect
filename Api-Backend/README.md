CREATE DATABASE campus_connect;

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
