const express = require("express");
const router = express.Router();
const studentsController = require("../Controllers/studentController");
const { verifyToken } = require("../middleware/authMiddleware");

// Middleware for file upload
const upload = studentsController.upload;

// Student CRUD Routes
router.get("/getall", studentsController.getAllStudents); // Fetch all students
router.post("/add", verifyToken, upload.single('resume'), studentsController.addStudent); // Add a new student (with resume)
router.put("/update/:id", verifyToken, upload.single('resume'), studentsController.updateStudent); // Update a student (with resume)
router.delete("/delete/:id", verifyToken, studentsController.deleteStudent); // Delete a student
router.get("/download-resume/:id", studentsController.downloadResume); // Download student's resume

module.exports = router;
