const pool = require("../config/db");

// Insert student function
exports.insertStudent = async (req, res) => {
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
    const sql = `
            INSERT INTO students (name, department, year, image, company_name, employee, branch, degree, batch, stipend)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
    ];

    const [result] = await pool.execute(sql, values);
    res.status(201).json({ message: "Student added successfully", result });
  } catch (error) {
    console.error("Insert Error:", error);
    res.status(500).json({ message: "Error inserting student", error });
  }
};

// Get all students function
exports.getAllStudents = async (req, res) => {
  try {
    const sql = `SELECT * FROM students`;
    const [students] = await pool.execute(sql);
    res.status(200).json({ students });
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ message: "Error fetching students", error });
  }
};
