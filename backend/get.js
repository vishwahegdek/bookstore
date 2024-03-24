const express = require('express');
const path = require('path');
const { authMiddleware ,adminMiddleware} = require('./middleware');
const { query } = require('./db');

const router = express.Router();


router.get('/book/:book_id', async (req, res) => {
  const bookId = req.params.book_id;
  try {
      const book = await query(`
          SELECT * FROM Books
          WHERE book_id = ?
      `, [bookId]);
      
      if (book.length === 0) {
          return res.status(404).json({ error: 'Book not found' });
      }
      const imageUrl = `/book_images/${book[0].book_id}.jpg`;
      book[0].imageUrl = imageUrl;
      res.json({ book });
  } catch (error) {
      console.error('Error fetching book:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/books',adminMiddleware, async (req,res)=>{
  try {
    const book = await query(`
        SELECT * FROM Books`);
    
    if (book.length === 0) {
        return res.status(404).json({ error: 'Book not found' });
    }

    res.json({ book });
} catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}
})


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
      

      // Construct image URLs for each book
      for (let book of books) {
        // Assuming book ID is used for filename and .jpg extension
        const imageUrl = `/book_images/${book.book_id}.jpg`;
        book.imageUrl = imageUrl;
      }
  
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

  
  router.get('/system-stats',adminMiddleware, async (req, res) => {
    try {
      const [usersCount] = await query('SELECT COUNT(*) AS total_users FROM Customer');
      const [booksCount] = await query('SELECT COUNT(*) AS total_books FROM Books');
      const [genresCount] = await query('SELECT COUNT(*) AS total_genres FROM Genres');
      const [systemStats] = await query('SELECT total_books_sold, total_books_in_stock FROM SystemStats');

      const totalUsers = usersCount ? usersCount.total_users : 0;
      const totalBooks = booksCount ? booksCount.total_books : 0;
      const totalGenres = genresCount ? genresCount.total_genres : 0;
      const totalBooksSold = systemStats ? systemStats.total_books_sold : 0;
      const totalBooksInStock = systemStats ? systemStats.total_books_in_stock : 0;

      res.json({
        totalUsers,
        totalBooks,
        totalGenres,
        totalBooksSold,
        totalBooksInStock
      });
    } catch (error) {
      console.error('Error fetching system stats:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Fetch all user details
router.get('/users', adminMiddleware, async (req, res) => {
  try {
    const users = await query(`
      SELECT *
      FROM Customer
    `);

    res.json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a user
// Delete a user
router.delete('/users/:userId', adminMiddleware, async (req, res) => {
  const userId = req.params.userId;

  try {
    // Delete related records in OwnedBooks table
    await query(`
      DELETE FROM OwnedBooks
      WHERE customer_id = ?
    `, [userId]);

    // Then delete the user
    const result = await query(`
      DELETE FROM Customer
      WHERE customer_id = ?
    `, [userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ msg: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



  
  
  module.exports = router;