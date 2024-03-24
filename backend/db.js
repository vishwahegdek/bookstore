const mysql = require('mysql');

// Create a MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'vishwahegde',
  database: 'bookstore_management',
});

// Execute a query using the connection pool
function query(sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }
      connection.query(sql, values, (err, results) => {
        connection.release();
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  });
}

// Create the database if it doesn't exist
async function createDatabase() {
  try {
    await query('CREATE DATABASE IF NOT EXISTS bookstore_management');
    console.log('Database created successfully');
  } catch (error) {
    console.error('Error creating database:', error);
  }
}

// Use the created database
createDatabase();
pool.query('USE bookstore_management');

// Create tables
async function createTables() {
  try {
    await query(`
    CREATE TABLE IF NOT EXISTS Customer (
      customer_id INT PRIMARY KEY AUTO_INCREMENT,
      username VARCHAR(255) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL,
      balance DECIMAL(10, 2) DEFAULT 10000.00
    )
  `);
  
  await query(`
    CREATE TABLE IF NOT EXISTS Genres (
      genre_id INT PRIMARY KEY AUTO_INCREMENT,
      genre_name VARCHAR(255) NOT NULL
    )
  `);
  
  await query(`
    CREATE TABLE IF NOT EXISTS Books (
      book_id INT PRIMARY KEY AUTO_INCREMENT,
      title VARCHAR(255) NOT NULL,
      author VARCHAR(255) NOT NULL,
      description TEXT,
      price DECIMAL(10, 2) NOT NULL,
      genre_id INT,
      FOREIGN KEY (genre_id) REFERENCES Genres(genre_id) ON DELETE CASCADE
    )
  `);
  
  await query(`
    CREATE TABLE IF NOT EXISTS OwnedBooks (
      owned_book_id INT PRIMARY KEY AUTO_INCREMENT,
      customer_id INT,
      book_id INT,
      FOREIGN KEY (customer_id) REFERENCES Customer(customer_id) ON DELETE CASCADE,
      FOREIGN KEY (book_id) REFERENCES Books(book_id) ON DELETE CASCADE
    )
  `);
  
  await query(`
    CREATE TABLE IF NOT EXISTS SystemStats (
      stat_id INT PRIMARY KEY AUTO_INCREMENT,
      total_books_sold INT NOT NULL DEFAULT 0,
      total_books_in_stock INT NOT NULL DEFAULT 500
    )
  `);
  
  await query(`
    CREATE TABLE IF NOT EXISTS Admin (
      admin_id INT PRIMARY KEY AUTO_INCREMENT,
      admin_email VARCHAR(255) NOT NULL,
      password_hash VARCHAR(255) NOT NULL
    )
  `);
  


    console.log('Tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
  }
}

// Export methods for CRUD operations
module.exports = {
  query,
  createTables,
};
