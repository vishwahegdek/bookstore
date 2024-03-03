const express = require('express');
const { authMiddleware } = require('./middleware'); // Assuming you have a middleware for authentication
const { query } = require('./db'); // Assuming your database module is named 'db'

const router = express.Router();


// All Books
router.get('/books', async (req, res) => {
    try {
      const books = await query(`
        SELECT * FROM Books
      `);
  
      res.json({ books });
      console.log(req.username)
    } catch (error) {
      console.error('Error fetching books:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// All Genres
router.get('/genres', async (req, res) => {
try {
    const genres = await query(`
    SELECT * FROM Genres
    `);

    res.json({ genres });
} catch (error) {
    console.error('Error fetching genres:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}
});
  
  // Books by Genre
  router.get('/books/genre/:genreId', async (req, res) => {
    const { genreId } = req.params;
  
    try {
      const books = await query(`
        SELECT * FROM Books
        WHERE genre_id = ?
      `, [genreId]);
  
      res.json({ books });
    } catch (error) {
      console.error('Error fetching books by genre:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Books in Cart
  router.get('/cart', async (req, res) => {
    const userId = req.userId; // Assuming you set userId in authMiddleware
  
    try {
      const cart = await query(`
        SELECT Books.*
        FROM Cart
        JOIN Books ON Cart.book_id = Books.book_id
        WHERE Cart.customer_id = ?
      `, [userId]);
  
      res.json({ cart });
    } catch (error) {
      console.error('Error fetching books in cart:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Books Purchased
  router.get('/purchased', async (req, res) => {
    const userId = req.userId; // Assuming you set userId in authMiddleware
  
    try {
      const purchasedBooks = await query(`
        SELECT Books.*, PurchasedBooks.purchase_date
        FROM PurchasedBooks
        JOIN Books ON PurchasedBooks.book_id = Books.book_id
        WHERE PurchasedBooks.customer_id = ?
      `, [userId]);
  
      res.json({ purchasedBooks });
    } catch (error) {
      console.error('Error fetching purchased books:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Add Books (Admin Access)
  router.post('/admin/add-books', async (req, res) => {
    // Check if the user has admin access (you need to implement this check)
    const isAdmin = true; // Replace with your actual admin check logic
  
    if (!isAdmin) {
      return res.status(403).json({ error: 'Permission Denied' });
    }
  
    const { books } = req.body;
  
    try {
      // Assuming your Books table has columns: title, author, price, genre_id
      const insertPromises = books.map(book => {
        return query(`
          INSERT INTO Books (title, author, price, genre_id)
          VALUES (?, ?, ?, ?)
        `, [book.title, book.author, book.price, book.genre_id]);
      });
  
      await Promise.all(insertPromises);
  
      res.json({ msg: 'Books added successfully' });
    } catch (error) {
      console.error('Error adding books:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.get("/firstname", authMiddleware, async (req, res) => {
    try {
      const result = await query(`
        SELECT first_name FROM Customer WHERE username = ?
      `, [req.username]);

      if (result.length > 0) {
        res.json({ firstName: result[0].first_name });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('Error fetching first name:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  router.get('/user-details', authMiddleware, async (req, res) => {
    try {
      const userDetails = await query(`
        SELECT customer_id, username, first_name, last_name, balance
        FROM Customer
        WHERE username = ?
      `, [req.username]);
  
      if (userDetails.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const userId = userDetails[0].customer_id;
  
      const ownedBooks = await query(`
        SELECT Books.*
        FROM OwnedBooks
        JOIN Books ON OwnedBooks.book_id = Books.book_id
        WHERE OwnedBooks.customer_id = ?
      `, [userId]);
  
      res.json({ userDetails: userDetails[0], ownedBooks });
    } catch (error) {
      console.error('Error fetching user details and owned books:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  
  module.exports = router;