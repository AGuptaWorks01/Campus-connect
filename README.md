# **Campus-Connect: Setup Guide**

This guide will help you set up the **Campus-Connect** project on your local machine. Follow the steps carefully to ensure a smooth installation and configuration.

---
![CC](https://github.com/user-attachments/assets/ddce8cde-eb32-4fcf-90c3-4ea2ebaac75a)
![CC1](https://github.com/user-attachments/assets/d9f2889f-5882-42bb-9b78-5a8198e5a439)
![CC2](https://github.com/user-attachments/assets/0175dc2a-8799-4c62-b96d-d7dc0f86736c)
![CC3](https://github.com/user-attachments/assets/c9a37b48-ac31-4606-88f5-5488ec83e8ad)

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
  resume VARCHAR(255),
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

## **📌 Step 6: Set Up Email Credentials for Nodemailer**

In order to send emails from your application using Nodemailer, you need to configure an email account with Google (Gmail). Follow these steps to retrieve the necessary credentials for EMAIL_USER and EMAIL_PASS.

1. Enable 2-Step Verification
   Before generating an App Password, you must enable 2-Step Verification for your Google account.

Go to your Google Account Security Settings:  
Visit Google Account Security.

Enable 2-Step Verification:  
Under "Signing in to Google," you'll see an option called 2-Step Verification.  
Click Get Started and follow the on-screen instructions to enable it (you'll likely need to enter a phone number to receive verification codes).  
2. Generate an App Password  
Once you have 2-Step Verification enabled, you can generate an App Password to use with Nodemailer.

Go to the App Passwords Page:  
Visit App Passwords while logged into your Google account.
Select App and Device:  
Under Select App, choose Mail (or you can type it in the box if it's not listed).
Under Select Device, choose the device you're using (for example, Windows Computer, Other, etc.).
Generate the App Password:  
Click Generate.  
Google will provide you with a 16-character app-specific password, something like:

> `abcd efgh ijkl mnop`  
> Copy this password. This is your EMAIL_PASS.  
> 3. Use the App Password
> Now that you have your App Password, you can use it in the .env file for EMAIL_PASS:

```EMAIL_USER=your-email@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop  (This is the app password you just generated)
```

---

## **📌 Step 7: Set Up Gemini API Key**

Steps to Get an API Key from AI Studio

1. Sign In to Your AI Studio Account  
   Visit the AI Studio platform you're using (for example, if you're using Gemini AI or a similar service).  
   Log in using your credentials (either Google or other account depending on the service).
2. Navigate to the API Section  
   Once logged in, look for the API or Developer section in the dashboard. This might be labeled something like:  
   `API Access`  
   `API Keys`  
   `Credentials`  
   `Developer Tools`
3. Create a New API Project (if necessary)  
   Some platforms require you to create a new API project before generating an API key.  
   Look for an option like Create New Project or Add API Key and follow the prompts.
4. Generate the API Key  
   After setting up your project, there should be a button to Generate API Key.  
   Click on Generate API Key or Create New Key.  
   The system will provide you with a long alphanumeric string, which is your API key.
5. Copy the API Key  
   Copy this generated API Key. It will look something like this:  
   `12345abcde67890fghijklmnopqrstuv`
6. Use the API Key in Your Project  
   Once you have the API key, update your .env file in the API-Backend directory: `GEMINI_API_KEY=your-gemini-api-key-here`

## **📌 API Endpoints**

### **Authentication APIs**

- **Register User:** `POST http://localhost:3100/api/auth/register`
- **Login User:** `POST http://localhost:3100/api/auth/login`
- **Request Reset Password:** `POST http://localhost:3100/api/auth/request-password-reset`
- **Reset Password:** `POST http://localhost:3100/api/auth/reset-password`

### **Student APIs**

- **Add Student Info:** `POST http://localhost:3100/api/students/add`
- **Get All Students:** `GET http://localhost:3100/api/students/getall`
- **Update Student Info:** `PUT http://localhost:3100/api/students/update/:id`
- **Delete Student Info:** `DELETE http://localhost:3100/api/students/delete/:id`
- **Downloads a student's resume.:** `GET http://localhost:3100/api/students/download-resume/:id`

### **Students Feedback**

- **Add Student Feedback:** `POST http://localhost:3100/api/feedbacks`
- **Get Student Feedback:** `GET http://localhost:3100/api/feedbacks`

### \*_Ai Interview Prepration_

- **Generates content using Gemini AI based on prompt.** `POST http://localhost:3100/gemini/generate-content`

---

# CAMPUS-CONNECT/

# api-backend ( Backend Folder Structure)

api-backend/  
│  
├── config/ # Database and environment configuration  
│ └── db.js # Contains the database connection logic  
│  
├── controllers/ # Logic for handling requests and responses  
│ ├── AuthController.js # Handles user authentication (login, register)  
│ ├── FeedbackController.js # Handles feedback-related operations  
│ └── StudentController.js # Handles student-related operations  
│  
├── middleware/ # Middleware for request validation and token verification  
│ └── authMiddleware.js # Validates JWT tokens for protected routes  
│  
├── routes/ # Defines route handling logic  
│ ├── authRoutes.js # Handles routes like login and registration  
│ ├── feedbackRoutes.js # Handles feedback submission and retrieval  
│ └── studentRoutes.js # Handles student data retrieval and updates  
│  
├── uploads/ # Directory to store uploaded files (e.g., resumes)  
│ └── (Uploaded files) # Stores files like resumes  
│  
├── server.js # Main file to start the server, configure routes, and middleware  
├── .env # Stores environment variables (e.g., database URI, JWT secret)  
│  
└── package.json # Project dependencies and scripts

# Client-Frontend ( Angular Frontend Folder Structure)

client-frontend/  
│  
└── src/  
├── app/  
│ ├── auth-guard/ # Auth Guard-related files  
│ │ └── auth.guard.ts # Protects routes from unauthorized access  
│ │  
│ ├── components/ # Reusable UI components (pages)  
│ │ ├── home/ # Home page component  
│ │ │ ├── home.component.ts # Component Logic (TypeScript)  
│ │ │ ├── home.component.html # Component Template (HTML)  
│ │ │ └── home.component.scss # Component Styles (CSS/SCSS)  
│ │ ├── login/ # Login page component  
│ │ │ ├── login.component.ts  
│ │ │ ├── login.component.html  
│ │ │ └── login.component.scss  
│ │ ├── register/ # Register page component  
│ │ │ ├── register.component.ts  
│ │ │ ├── register.component.html  
│ │ │ └── register.component.scss  
│ │ ├── forget-password/ # Forget password page  
│ │ │ ├── forget-password.component.ts  
│ │ │ ├── forget-password.component.html  
│ │ │ └── forget-password.component.scss  
│ │ ├── reset-password/ # Reset password page  
│ │ │ ├── reset-password.component.ts  
│ │ │ ├── reset-password.component.html  
│ │ │ └── reset-password.component.scss  
│ │ ├── students-details/ # Students details page component  
│ │ │ ├── students-details.component.ts  
│ │ │ ├── students-details.component.html  
│ │ │ └── students-details.component.scss  
│ │ ├── ai-powered-mock-interview/ # AI-powered mock interview  
│ │ │ ├── ai-powered-mock-interview.component.ts  
│ │ │ ├── ai-powered-mock-interview.component.html  
│ │ │ └── ai-powered-mock-interview.component.scss  
│ │ ├── ai-powered-resume-review/ # AI-powered resume review  
│ │ │ ├── ai-powered-resume-review.component.ts  
│ │ │ ├── ai-powered-resume-review.component.html  
│ │ │ └── ai-powered-resume-review.component.scss  
│ │ ├── feedback/ # Feedback component  
│ │ │ ├── feedback.component.ts  
│ │ │ ├── feedback.component.html  
│ │ │ └── feedback.component.scss  
│ │  
│ ├── layout/ # Layout components (Navbar, Footer)  
│ │ ├── navbar/ # Navbar component  
│ │ │ ├── navbar.component.ts  
│ │ │ ├── navbar.component.html  
│ │ │ └── navbar.component.scss  
│ │ └── footer/ # Footer component  
│ │ ├── footer.component.ts  
│ │ ├── footer.component.html  
│ │ └── footer.component.scss  
│ │  
│ ├── services/ # Angular services for API interaction  
│ │ ├── auth.service.ts # Auth service for login, register, JWT management  
│ │ ├── students.service.ts # Service to manage student data  
│ │ ├── gemini-ai.service.ts # Service for Gemini AI (mock interview, resume review)  
│ │ └── feedback.service.ts # Service for handling feedback submission  
│ │  
│ ├── app.component.ts # Root component of the app  
│ ├── app.component.html # Template for root app (includes navbar, footer, router-outlet)  
│ └── app.component.scss # Root-level styles  
│  
├── assets/ # Static assets (images, icons, etc.)  
│ ├── images/ # Folder for images  
│  
├── index.html # The root HTML file  
├── main.ts # The main entry point for Angular  
├── polyfills.ts # For cross-browser compatibility  
├── styles.css # Global styles (can be SCSS/CSS)  
└── tsconfig.json # TypeScript configuration for Angular

---

## **📌 Notes**

- Ensure MySQL is running on your system before starting the backend.
- Use **Postman** or **any API testing tool** to test API endpoints.
- If you encounter any issues, check the terminal logs for error messages.

---

## 🎉 **Congratulations!**

You have successfully set up the **Campus-Connect** project. Happy coding! 🚀
