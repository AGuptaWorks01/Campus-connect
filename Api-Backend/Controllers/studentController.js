const pool = require("../config/db");
const multer = require("multer");
const path = require("path");

// Multer storage configuration for resume upload (only PDF)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');  // Store uploaded files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Generate a unique file name based on timestamp
  },
});

exports.upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed")); // Only allow PDFs
    }
    cb(null, true);
  },
});

// ✅ Insert Student (with resume upload)
exports.addStudent = async (req, res) => {
  const {
    name,
    year,
    company_name,
    employee_type,
    branch,
    linkedin,
    github,
  } = req.body;
  const user_id = req.user.id; // Get logged-in user ID from middleware

  // Default image URL if no image is provided
  const defaultImage = "https://img.freepik.com/premium-vector/profiling-flat-illustration_120816-75323.jpg";
  const image = req.body.image || defaultImage; // If no image, use the default image

  // Handle resume upload (if provided)
  let resume = null;
  if (req.file) {
    resume = `/uploads/${req.file.filename}`; // Store the file path for the uploaded resume
  }

  try {
    // Check if user already has a student record
    const [existingStudent] = await pool.query("SELECT id FROM students WHERE user_id = ?", [user_id]);
    if (existingStudent.length > 0) {
      return res.status(400).json({ message: "You can only add one student record." });
    }

    // Insert the student record into the database
    const sql = `
      INSERT INTO students (name, branch, year, image, company_name, employee_type, linkedin, github, resume, user_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      name, branch, year, image, company_name, employee_type, linkedin, github, resume, user_id
    ];

    const [result] = await pool.execute(sql, values);
    res.status(201).json({
      message: "Student added successfully",
      studentId: result.insertId
    });
  } catch (error) {
    console.error("Insert Error:", error);
    res.status(500).json({ message: "Error inserting student", error });
  }
};

// ✅ Get All Students (No Restrictions)
exports.getAllStudents = async (req, res) => {
  try {
    const sql = `SELECT s.*, u.username, u.email FROM students s JOIN users u ON s.user_id = u.id ORDER BY s.id DESC`;
    const [students] = await pool.execute(sql);
    res.status(200).json({ students });
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ message: "Error fetching students", error });
  }
};

// ✅ Update Student (Only User's Own Record) and Allow Resume Update
exports.updateStudent = async (req, res) => {
  const studentId = req.params.id;
  const userId = req.user.id; // Get logged-in user ID from middleware

  const {
    name,
    branch,
    year,
    company_name,
    employee_type,
    image,
    linkedin,
    github,
  } = req.body;

  // Handle resume update (if provided)
  let resume = null;
  if (req.file) {
    resume = `/uploads/${req.file.filename}`;  // Store the new file path for the updated resume
  }

  try {
    // Ensure the student belongs to the logged-in user
    const [existingStudent] = await pool.query(
      "SELECT id FROM students WHERE id = ? AND user_id = ?",
      [studentId, userId]
    );

    if (existingStudent.length === 0) {
      return res.status(403).json({
        message: "Unauthorized: You can only update your own student record.",
      });
    }

    // Update student record
    const sql = `
      UPDATE students
      SET name = ?, branch = ?, year = ?, company_name = ?, employee_type = ?, 
          image = ?, linkedin = ?, github = ?, resume = ?
      WHERE id = ? AND user_id = ?
    `;
    const values = [
      name, branch, year, company_name, employee_type, image, linkedin, github, resume, studentId, userId
    ];
    const [result] = await pool.execute(sql, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Student not found or not authorized to update." });
    }

    res.status(200).json({ message: "Student updated successfully" });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Error updating student", error });
  }
};

// ✅ Delete Student (Only User's Own Record)
exports.deleteStudent = async (req, res) => {
  const studentId = req.params.id;
  const userId = req.user.id;

  try {
    const sql = "DELETE FROM students WHERE id = ? AND user_id = ?";
    const [result] = await pool.execute(sql, [studentId, userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Student not found or not authorized to delete." });
    }

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: "Error deleting student", error });
  }
};

// ✅ Download Resume (PDF) for a student
exports.downloadResume = async (req, res) => {
  const studentId = req.params.id;

  try {
    const sql = "SELECT resume FROM students WHERE id = ?";
    const [student] = await pool.execute(sql, [studentId]);

    if (!student || student.length === 0 || !student[0].resume) {
      return res.status(404).json({ message: "Resume not found." });
    }

    const filePath = student[0].resume;
    res.download(filePath, "resume.pdf"); // Send resume as a downloadable PDF file
  } catch (error) {
    console.error("Download Error:", error);
    res.status(500).json({ message: "Error downloading resume", error });
  }
};
