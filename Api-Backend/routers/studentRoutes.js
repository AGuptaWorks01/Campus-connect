const express = require("express");
const router = express.Router();
const studentsController = require("../Controllers/studentController");
const { verifyToken } = require("../Middleware/authMiddleware");

// Student CRUD Routes
router.get("/getall", studentsController.getAllStudents); // Fetch all students
router.post("/add", verifyToken, studentsController.addStudent); // Add a new student
router.put("/update/:id", verifyToken, studentsController.updateStudent); // Update a student
router.delete("/delete/:id", verifyToken, studentsController.deleteStudent); // Delete a student

module.exports = router;
