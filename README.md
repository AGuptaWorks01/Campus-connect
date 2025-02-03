# **Campus-Connect: Setup Guide**

This guide will help you set up the **Campus-Connect** project on your local machine. Follow the steps carefully to ensure a smooth installation and configuration.

---

## **📌 Step 1: Clone the GitHub Repository**
Open your terminal and run the following command to clone the project:

```bash
git clone https://github.com/AGuptaWorks01/Campus-connect.git
```

Once the cloning is complete, navigate to the **Campus-Connect** project directory:

```bash
cd Campus-connect
```

---

## **📌 Step 2: Configure the Backend (API)**
1. **Navigate to the API folder:**
   ```bash
   cd API-Backend
   ```

2. **Set Up Environment Variables:**
   - Open the `.env` file inside the `API-Backend` folder.
   - Locate the following line:
     ```
     DB_PASSWORD=Your_DB_Password
     ```
   - **Replace** `Your_DB_Password` with your actual MySQL password.

---

## **📌 Step 3: Set Up the Database**
Before running the backend, you need to create the MySQL database and tables.

1. **Open MySQL** and execute the following SQL queries **one by one**:

```sql
-- Step 1: Create the Database
CREATE DATABASE IF NOT EXISTS Campus_Connect;

-- Step 2: Select the Database
USE Campus_Connect;

-- Step 3: Create the Users Table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Step 4: Create the Students Table
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

-- Step 5: Create the Feedbacks Table
CREATE TABLE IF NOT EXISTS feedbacks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review TEXT NOT NULL,
  user_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);



```

---

## **📌 Step 4: Install Dependencies & Start Backend**
After setting up the database, install the required backend dependencies:

1. **Navigate to API-Backend folder**:
   ```bash
   cd API-Backend
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the backend server**:
   ```bash
   npm start
   ```
   > The backend will run on `localhost:3100`.

---

## **📌 Step 5: Install Dependencies & Start Frontend**
1. **Navigate to Client-Frontend folder**:
   ```bash
   cd ../Client-Frontend
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the frontend server**:
   ```bash
   ng serve
   ```
   > The frontend will run on `localhost:4200`.

---

## **📌 API Endpoints**
### **Authentication APIs**
- **Register User:** `POST http://localhost:3100/api/auth/register`
- **Login User:** `POST http://localhost:3100/api/auth/login`
- **Reset Password:** `POST http://localhost:3100/api/auth/reset-password`

### **Student APIs**
- **Add Student Info:** `POST http://localhost:3100/api/students/add`
- **Get All Students:** `GET http://localhost:3100/api/students/getall`
- **Update Student Info:** `PUT http://localhost:3100/api/students/update/:id`
- **Delete Student Info:** `DELETE http://localhost:3100/api/students/delete/:id`

---

## **📌 Notes**
- Ensure MySQL is running on your system before starting the backend.
- Use **Postman** or **any API testing tool** to test API endpoints.
- If you encounter any issues, check the terminal logs for error messages.

---

## 🎉 **Congratulations!**
You have successfully set up the **Campus-Connect** project. Happy coding! 🚀

