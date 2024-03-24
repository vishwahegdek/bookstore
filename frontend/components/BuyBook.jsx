import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const handleBuyClick = async (bookId, bookName) => {
    const storedToken = localStorage.getItem('token');
    
    // Confirm purchase with user
    const confirmPurchase = window.confirm(`Are you sure you want to buy ${bookName}?`);
    
    // If user confirms purchase
    if (confirmPurchase) {
      // Set default quantity to 1
      let quantity = 1;
  
      if (storedToken) {
        try {
          const response = await axios.post(
            'http://localhost:3000/checkout',
            JSON.stringify({ bookId, quantity }),
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${storedToken}`,
              },
            }
          );
  
          if (response && response.data) {
            alert(response.data.message);
          } else {
            console.error('Invalid response from server:', response);
          }
        } catch (error) {
          console.error('Error purchasing book:', error.response.data.error);
        }
      }
    }
  };

const BuyBook = () => {
  const [bookDetails, setBookDetails] = useState({});
  const { bookId } = useParams();
  const storedToken = localStorage.getItem('token');

  useEffect(() => {
    if (storedToken) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/book/${bookId}`,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${storedToken}`,
              },
            }
          );
          setBookDetails(response.data.book[0]);
        } catch (error) {
          console.error('Error fetching book details:', error);
        }
      };
      fetchData();
    }
  }, [bookId, storedToken]);

  return (
    <div>
      <h2>{bookDetails.title}</h2>
      <p><strong>Author:</strong> {bookDetails.author}</p>
      <p><strong>Price:</strong> ${bookDetails.price}</p>
      <p><strong>Description:</strong> {bookDetails.description}</p>
      <img src={`http://localhost:3000${bookDetails.imageUrl}`} alt={bookDetails.title} style={{ maxWidth: '200px' }} />
      <button onClick={() => handleBuyClick(bookDetails.book_id, bookDetails.title)}>Buy Now</button>
    </div>
  );
};

export default BuyBook;
