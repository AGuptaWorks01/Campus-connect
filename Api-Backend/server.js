// Load environment variables from the .env file into process.env
require("dotenv").config();

// Importing the main Express application from the app.js file
const app = require("./src/app.js");

// Setting the server port from environment variables or using default (3100)
const PORT = process.env.PORT || 3100;

// Start the Express server and listen on the defined port
app.listen(
  PORT,
  () => console.log(`Server Running on http://localhost:${PORT}`) // Log message when server is up
);

