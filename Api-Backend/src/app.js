// Importing required modules
const express = require("express"); // Express framework for building REST APIs
const cookieParser = require("cookie-parser"); // Middleware for parsing cookies
const cors = require("cors"); // Middleware for handling Cross-Origin Resource Sharing (CORS)
const responseTime = require("response-time"); // Middleware to measure response time
const compression = require("compression"); // Middleware to compress response bodies to improve performance
const hpp = require("hpp"); // Middleware to prevent HTTP Parameter Pollution
const helmet = require("helmet"); // Security middleware to set various HTTP headers for security
const bodyParser = require("body-parser"); // Middleware to parse incoming request bodies
const xss = require("xss-clean"); // Middleware to sanitize user input and prevent Cross-Site Scripting (XSS) attacks
const mongoSanitize = require("express-mongo-sanitize"); // Middleware to sanitize inputs and prevent NoSQL injection
const rateLimit = require("express-rate-limit"); // Middleware to limit the number of requests from an IP address to prevent abuse
const swaggerUi = require("swagger-ui-express"); // Middleware to serve Swagger API documentation
const YAML = require("yamljs");

// Importing router files
const studentsRoutes = require("./routers/Student.Route"); // Routes for student-related API endpoints
const authRouter = require("./routers/Auth.Route"); // Routes for authentication-related API endpoints
const feedbackRoutes = require("./routers/Feedback.Route"); // Routes for feedback-related API endpoints
const aiRoutes = require("./routers/Ai.Route"); // Routes for AI-related API endpoints
// const swaggerSpec = require("./config/swagger.config"); // Swagger configuration for API documentation
const swaggerDocument = YAML.load("./src/docs/swagger.doc.yaml"); // Swagger configuration for API documentation


// Creating an instance of Express application
const app = express();

// ====== Security & Performance Middleware ======
// Setting up security and performance-related middleware
app.use(helmet()); // Applying security headers to all responses
app.use(compression()); // Applying GZIP compression to reduce response sizes
app.use(xss()); // Sanitizing input to prevent XSS attacks
app.use(mongoSanitize()); // Sanitizing input to prevent NoSQL injection
app.use(hpp()); // Protecting against HTTP parameter pollution

// Rate Limiting Setup
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Setting a 15-minute window for rate limiting
  max: 100, // Allowing a maximum of 100 requests per IP address in the window
  message: "Too many requests from this IP, please try again later.", // Message to return if the limit is exceeded
});
app.use(limiter); // Applying rate limiting middleware

// Middleware Setup
app.use(responseTime()); // Measuring the time taken to process each request
app.use(cookieParser()); // Parsing cookies from incoming requests
app.use(cors({ origin: "*", credentials: true })); // Enabling CORS for all origins and allowing credentials (cookies, etc.)
app.use(express.json()); // Parsing incoming JSON payloads
app.use(bodyParser.json()); // Parsing incoming JSON data from the request body

// Static file serving for the 'uploads' folder
app.use("/uploads", express.static("uploads")); // Serving files in the 'uploads' directory as static files

// API Routes
app.use("/api/auth", authRouter); // Authentication-related routes
app.use("/api/students", studentsRoutes); // Student-related routes
app.use("/api/feedbacks", feedbackRoutes); // Feedback-related routes
app.use("/api/gemini", aiRoutes); // AI-related routes

// Swagger API documentation route
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Serving the API docs at /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ======== Global Error Handler ========
// Handling all unhandled errors globally
app.use((err, req, res, next) => {
  console.error("Global Error:", err); // Logging the error
  res.status(500).json({
    message: "Internal Server Error", // Responding with a 500 error and message
    error: err.message, // Including the error message in the response
  });
});

// Exporting the app for use in other parts of the application
module.exports = app;
