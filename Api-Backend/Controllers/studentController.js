const pool = require("../config/db");

// ✅ Insert Student (Only One per User)
exports.addStudent = async (req, res) => {
  const {
    name,
    department,
    year,
    image,
    company_name,
    employee,
    branch,
    degree,
    batch,
    stipend,
    user_id, // Ensure user_id is included
  } = req.body;

  try {
    // Check if user already has a student record
    const [existingStudent] = await pool.query(
      "SELECT * FROM students WHERE user_id = ?",
      [user_id]
    );

    if (existingStudent.length > 0) {
      return res.status(400).json({ message: "You can only add one student record." });
    }

    // Insert student if user does not have one
    const sql = `
      INSERT INTO students (name, department, year, image, company_name, employee, branch, degree, batch, stipend, user_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      name,
      department,
      year,
      image,
      company_name,
      employee,
      branch,
      degree,
      batch,
      stipend,
      user_id
    ];

    const [result] = await pool.execute(sql, values);
    res.status(201).json({ message: "Student added successfully", studentId: result.insertId });

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

// ✅ Update Student (Only User's Own Record)
exports.updateStudent = async (req, res) => {
  const studentId = req.params.id;
  const userId = req.user.id; // Get logged-in user ID from middleware

  const {
    name,
    department,
    year,
    image,
    company_name,
    employee,
    branch,
    degree,
    batch,
    stipend,
  } = req.body;

  try {
    // Ensure the student belongs to the logged-in user
    const [existingStudent] = await pool.query(
      "SELECT * FROM students WHERE id = ? AND user_id = ?",
      [studentId, userId]
    );

    if (existingStudent.length === 0) {
      return res.status(403).json({ message: "Unauthorized: You can only update your own student record." });
    }

    const sql = `
      UPDATE students
      SET name = ?, department = ?, year = ?, image = ?, company_name = ?, 
          employee = ?, branch = ?, degree = ?, batch = ?, stipend = ?
      WHERE id = ? AND user_id = ?
    `;

    const values = [
      name,
      department,
      year,
      image,
      company_name,
      employee,
      branch,
      degree,
      batch,
      stipend,
      studentId,
      userId
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
