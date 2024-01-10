// server js
const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');

app.use (bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Create a MySQL connection pool 
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'anteneh',
  password: '5683#@!Love',
  database: 'portfolio',
});
// callback function for connecting to database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Connected to database as id ' + connection.threadId);
});

// Define the signup route
app.post('/signup', (req, res) => {
  // Extract the user data from the request body
  const { username, email, password } = req.body;

  // Create a user object with the form data
  const user = {
    username,
    email,
    password,
  };

  // Execute the MySQL query to insert the user into the database
  pool.getConnection((error, connection) => {
    if (error) {
      console.error('Error getting MySQL connection:', error);
      res.status(500).json({ error: 'An error occurred. Please try again.' });
      return;
    }

    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    const values = [user.username, user.email, user.password];

    connection.query(query, values, (error, results) => {
      connection.release(); // Release the MySQL connection

      if (error) {
        console.error('Error executing MySQL query:', error);
        res.status(500).json({ error: 'An error occurred. Please try again.' });
        return;
      }

      res.status(200).json({ message: 'User registered successfully!' });
    });
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});