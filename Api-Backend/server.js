const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./Config/db') // database ko import krha hai

const app = express()
app.use(bodyParser.json());

app.use(cors());
app.use(express.json())
const port = 3000

app.use(async (req, res, next) => {
    await db.testConnection();  // Test the DB connection
    next();  // Proceed to the next middleware or route handler
});

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Server Running on localhost//:${port}`))