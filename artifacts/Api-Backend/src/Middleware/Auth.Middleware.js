const jwt = require("jsonwebtoken");
const { JWT_SECRETKEY } = process.env;

exports.verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const cleanToken = token.replace("Bearer ", ""); // Ensure no extra spaces
    const decoded = jwt.verify(cleanToken, JWT_SECRETKEY);
    req.user = decoded; // Store decoded user details in request
    next();
  } catch (error) {
    console.error("Token Verification Error:", error);
    return res.status(400).json({ message: "Invalid or expired token." });
  }
};
