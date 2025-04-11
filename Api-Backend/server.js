const app = require('./src/app.js')

PORT = process.env.PORT


// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error("Global Error:", err);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// Start Server
app.listen(PORT, () => console.log(`Server Running on localhost:${PORT}`));
