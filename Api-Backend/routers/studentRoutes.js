const express = require('express');
const router = express.Router();
const studentsController = require('../Controllers/studentController');
const { verifyToken } = require('../Middleware/authMiddleware');

// Routes for student CRUD operations
router.get('/getall', studentsController.getAllStudents); // Fetch all students
router.post('/addstudents', verifyToken, studentsController.addStudent); // Add a new student
router.put('/students/:id', verifyToken, studentsController.updateStudent); // Update a student
router.delete('/students/:id', verifyToken, studentsController.deleteStudent); // Delete a student
module.exports = router;
