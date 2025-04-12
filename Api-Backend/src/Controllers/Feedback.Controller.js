const pool = require('../config/db'); // MySQL connection

// ================================== Create Feedback ==================================
exports.createFeedback = async (req, res) => {
    const { name, rating, review } = req.body;

    if (!name || !rating || !review) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const sql = 'INSERT INTO feedbacks (name, rating, review) VALUES (?, ?, ?)';
        const [result] = await pool.execute(sql, [name, rating, review]);

        res.status(201).json({
            message: 'Feedback submitted successfully',
            feedbackId: result.insertId
        });

    } catch (error) {
        console.error('Error adding feedback:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// ================================== Get All Feedback ==================================
exports.getAllFeedback = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM feedbacks ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching feedback:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
