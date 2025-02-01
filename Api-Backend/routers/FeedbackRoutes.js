const express = require('express');
const { createFeedback, getAllFeedback } = require('../Controllers/FeedbackController'); // Import Controller
const router = express.Router();

// Define Routes
router.post('/', createFeedback); // Create Feedback
router.get('/', getAllFeedback); // Get All Feedback

module.exports = router;
