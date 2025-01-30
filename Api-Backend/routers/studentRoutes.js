const express = require('express');
const { insertStudent, getAllStudents } = require('../Controllers/studentController'); // Import function
const router = express.Router();

router.post('/insert-student', insertStudent);
router.get('/students', getAllStudents);

module.exports = router;
