// Importing the swagger-jsdoc module to generate Swagger API documentation
const swaggerJSDoc = require("swagger-jsdoc");

// Defining options for Swagger JSDoc configuration
const options = {
  definition: {
    openapi: "3.0.4", // Specifying OpenAPI version to use
    info: {
      title: "Campus-Connect API Documentation", // Title of the API documentation
      version: "1.0.0", // Version of the API
      description:
        "Comprehensive API documentation for the Campus-Connect platform.", // Short description of the API
    },
    servers: [
      {
        url: "http://localhost:3100/api", // URL where the API is accessible
        description: "Development Server", // Description of the server
      },
    ],
  },
  apis: ["./routers/*.js"], // Path to the route files that contain API documentation annotations (adjust if routes are elsewhere)
};

// Generating the Swagger specification using the above options
const swaggerSpec = swaggerJSDoc(options);

// Exporting the generated Swagger specification to be used in other parts of the application
module.exports = swaggerSpec;
