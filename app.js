const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors'); // Import cors

const app = express();
const port = 3000;

// Use CORS middleware
app.use(cors());

// Initialize SQLite database
const db = new sqlite3.Database('./mydatabase.db', (err) => {
  if (err) {
    console.error('Could not open database', err);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Middleware for serving static files (like CSS and JS)
app.use(express.static('public'));
app.use(express.json());

// Get all users
app.get('/api/users', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
      res.status(500).send('Database error');
      return;
    }
    res.json(rows);
  });
});

// Add new user
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  const stmt = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)');
  stmt.run([name, email], function (err) {
    if (err) {
      res.status(500).send('Error adding user');
      return;
    }
    res.status(201).send({ id: this.lastID, name, email });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
