const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const promisePool = require("../config/db"); // Your MySQL connection pool

JWT_SECRETKEY = "jwt_token"

exports.register = async (req, res) => {
  try {
    // Check if the email already exists
    const [userRows] = await promisePool.query(
      "SELECT * FROM users WHERE email = ?",
      [req.body.email]
    );

    if (userRows.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Generate password hash
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // Insert new user into the database
    const [result] = await promisePool.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [req.body.username, req.body.email, hashPassword]
    );

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};




exports.login = async (req, res) => {
  try {
    // Fetch user from DB by email or username
    const [userRows] = await promisePool.query(
      "SELECT * FROM users WHERE email = ? OR username = ?",
      [req.body.emailOrUsername, req.body.emailOrUsername]
    );

    if (userRows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = userRows[0];

    // Check if the password matches
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
      },
      JWT_SECRETKEY,
      { expiresIn: "1h" }
    );

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({
        status: 200,
        message: "Login Success!",
        data: {
          _id: user.id,
          username: user.username,
          email: user.email,
        },
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};













// CREATE TABLE users (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   username VARCHAR(255) NOT NULL,
//   email VARCHAR(255) UNIQUE NOT NULL,
//   password VARCHAR(255) NOT NULL,
//   createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

