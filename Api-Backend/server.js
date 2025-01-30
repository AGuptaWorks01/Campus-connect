const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pool = require('./Config/db') // database ko import krha hai
const studentsRouter = require('./routers/studentRoutes')
const app = express()
const port = 3000


app.use(cors());
app.use(express.json())
app.use(bodyParser.json());


app.use('/api/students', studentsRouter)

app.use(async (req, res, next) => {
    await pool.testConnection();  // Test the DB connection
    next();  // Proceed to the next middleware or route handler
});


app.listen(port, () => console.log(`Server Running on localhost//:${port}`))