first you have to colve github link.
` git clone https://github.com/AGuptaWorks01/Campus-connect.git`

once you cloned the project then go to **APi-Backend** folder inside .env file and replace Your DB_PASSWORD password with your MySQl password.

then go to MySQL and Execute above Query.

CREATE DATABASE IF NOT EXISTS Campus_Connect;

-- Creating the users Table:
USE Campus_Connect;

CREATE TABLE IF NOT EXISTS users ( 
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Creating the students Table:
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
  user_id INT UNIQUE, 
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

--  Creating the feedbacks Table:
CREATE TABLE IF NOT EXISTS feedbacks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review TEXT NOT NULL,
  user_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


 Databases and tables are create.

 go to your folder and **APi-Backend** intergrate terminal and run ` npm start` (we are using **nodemon** ) package for auto save and run your project.
 it will run on `localhost:3100`

 then to **client-Frontend** intergrate terminal and run ` ng serve` 
 it will run on ` localhost:4200`



 


// api for register user
http://localhost:3100/api/auth/register

// api for login user
http://localhost:3100/api/auth/login


// api for insert student info
http://localhost:3100/api/students/insert-student

// api for get all students
http://localhost:3100/api/students/students


