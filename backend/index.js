const express = require('express');
const db = require('./db');
const get = require('./get')
const post = require('./post')
const auth = require('./auth')
const path = require('path');
const cors = require('cors')


const app = express();
const port = 3000;

app.use(cors())
app.use(express.json());
app.use('/',get)
app.use('/',post)
app.use('/',auth)
app.use('/book_images', express.static(path.join(__dirname, 'book_images')));

// Create tables if they don't exist
db.createTables();



// Add more API endpoints for cart, purchase, etc.

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
