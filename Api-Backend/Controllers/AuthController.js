const bcrypt = require("bcryptjs");
require('dotenv').config();  // Load environment variables
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { JWT_SECRETKEY, FRONTEND_URL, EMAIL_USER, EMAIL_PASS } = process.env;
const pool = require("../config/db");

// Register User
exports.register = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const [userRows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

    if (userRows.length > 0) {
      return res.status(400).json({ message: "Email already exists" }); // Already exists error
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    await pool.query("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [
      username, email, hashPassword
    ]);

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Error during registration", error: error.message });
  }
};

// User Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [userRows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

    if (userRows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = userRows[0];
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRETKEY, { expiresIn: "5h" });

    res.status(200).json({
      message: "Login Success!",
      data: { _id: user.id, username: user.username, email: user.email },
      token,
    });

  } catch (error) {
    console.error("Internal server error during login:", error);
    res.status(500).json({ message: "Internal server error during login", error: error.message });
  }
};

// Request Password Reset
exports.requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const [userRows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

    if (userRows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = userRows[0];
    const resetToken = jwt.sign({ email: user.email }, JWT_SECRETKEY, { expiresIn: "15m" });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
      tls: { rejectUnauthorized: false },
    });

    const mailOptions = {
      from: EMAIL_USER,
      to: email,
      subject: "Campus Connect - Reset Your Password",
      html: `
        <p>Hello ${user.username},</p>
        <p>Click the link below to reset your password:</p>
        <a href="${FRONTEND_URL}/reset-password/${resetToken}">Reset Password</a>
        <p>This link will expire in 15 minutes.</p>`,
    };

    await transporter.sendMail(mailOptions);
    return res.json({ message: "Password reset link sent!" });

  } catch (error) {
    console.error("Error during password reset request:", error);
    res.status(500).json({ message: "Error during password reset request", error: error.message });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    jwt.verify(token, JWT_SECRETKEY, async (err, decoded) => {
      if (err) {
        return res.status(400).json({ message: "Invalid or expired token" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      await pool.query("UPDATE users SET password = ? WHERE email = ?", [hashedPassword, decoded.email]);

      return res.json({ message: "Password reset successfully" });
    });

  } catch (error) {
    console.error("Error during password reset:", error);
    res.status(500).json({ message: "Error during password reset", error: error.message });
  }
};
