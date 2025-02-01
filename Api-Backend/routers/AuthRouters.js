const express = require("express");
// Import function
const {
  register,
  login,
  resetPassword,
  requestPasswordReset,
} = require("../Controllers/AuthController");
const router = express.Router();

// Register route
router.post("/register", register);

// Login route
router.post("/login", login);
// Reset password route

router.post("/request-password-reset", requestPasswordReset);

router.post("/reset-password", resetPassword); // Add this route for reset password

module.exports = router;
