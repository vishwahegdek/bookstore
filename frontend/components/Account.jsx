import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Account = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user-details', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
        // Handle error (show an error message, redirect, etc.)
      }
    };

    fetchData();
  }, []); // Dependency array is empty to ensure the effect runs only once

  return (
    <div style={styles.container}>
      {userData ? (
        <>
          <div style={styles.section}>
            <h2>User Details</h2>
            <p>Email: {userData.userDetails.username}</p>
            <p>Name: {userData.userDetails.first_name+" "+userData.userDetails.last_name}</p>
            <p>Balance: ₹{userData.userDetails.balance}</p>
          </div>

          <div style={styles.section}>
            <h2>Owned Books</h2>
            <ul style={styles.bookList}>
              {userData.ownedBooks.map((book) => (
                <li key={book.book_id} style={styles.bookItem}>
                  <p>Title: {book.title}</p>
                  <p>Author: {book.author}</p>
                  <p>Price: ₹{book.price}</p>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  },
  section: {
    marginBottom: '30px',
  },
  bookList: {
    listStyle: 'none',
    padding: '0',
  },
  bookItem: {
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  },
};

export default Account;
