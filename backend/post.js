const express = require('express');
const { authMiddleware } = require('./middleware');
const { query } = require('./db');

const router = express.Router();


router.post('/checkout', authMiddleware, async (req, res) => {
  const { bookId, quantity } = req.body;
  const username = req.username;

  try {
      // Retrieve customer information including balance
      const results = await query(`
          SELECT customer_id, balance FROM Customer WHERE username = ?
      `, [username]);

      const customerInfo = results[0];
      const customerId = customerInfo.customer_id;
      const balance = customerInfo.balance;

      // Assuming you have the price stored in the Books table
      const bookDetailsResults = await query(`
          SELECT price FROM Books WHERE book_id = ?
      `, [bookId]);

      const bookPrice = bookDetailsResults[0].price;

      // Check if the customer has enough balance
      const totalCost = bookPrice * quantity;
      if (balance < totalCost) {
          return res.status(400).json({ error: 'Insufficient balance' });
      }

      // Update the OwnedBooks table
      await query(`
          INSERT INTO OwnedBooks (customer_id, book_id, purchase_id)
          VALUES (?, ?, NULL)
      `, [customerId, bookId]);

      // Update the customer's balance
      const newBalance = balance - totalCost;
      await query(`
          UPDATE Customer SET balance = ? WHERE customer_id = ?
      `, [newBalance, customerId]);

      res.status(200).json({ message: 'Book(s) purchased successfully' });
  } catch (error) {
      console.error('Error processing checkout:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;