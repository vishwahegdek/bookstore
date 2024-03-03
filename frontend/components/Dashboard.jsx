import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import {Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Dashboard() {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(1);
  const [books, setBooks] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    // Check if a token is present in local storage
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      const result = fetch('http://localhost:3000/firstname',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedToken}`
        }
      }).then(async(res)=>{
        const json = await res.json()
        setLoggedInUser(json.firstName);
      })
    }
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/genres', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async (res) => {
        const result = await res.json();
        setGenres(result.genres);
      })
      .catch((error) => {
        console.error('Error fetching genres:', error);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/books/genre/${selectedGenre}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async (res) => {
        const result = await res.json();
        setBooks(result.books);
      })
      .catch((error) => {
        console.error(`Error fetching books for genre ${selectedGenre}:`, error);
      });
  }, [selectedGenre]);

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
  };
  const handleLogout= ()=>{
    localStorage.setItem("token","")
    window.location.reload(false);
  }

  const handleBuyClick = async (bookId, bookName) => {

    const storedToken = localStorage.getItem('token');

    // Prompt the user to enter quantity
    const quantity = prompt(`Enter quantity for ${bookName}:`);

    if (quantity === null || quantity.trim() === '') {
      alert('Please enter a valid quantity.');
      return;
    }

    if (storedToken) {
      try {
        // Make a POST request to the checkout route
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
  };

  return (
    <div className="container">
      <div className="auth-buttons">
        {loggedInUser ? (
          <>
            <p onClick={() => navigate("/account")}>Hello, {loggedInUser}!</p>
            <button onClick={handleLogout}>Log Out</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate("/signin")}>Sign In</button>
            <button onClick={() => navigate("/signup")}>Sign Up</button>
          </>
        )}
      </div>

      <h1 className="title">Books by Genres</h1>
      <div className="genre-list">
        {genres.map((genre) => (
          <div
            key={genre.genre_id}
            onClick={() => handleGenreClick(genre.genre_id)}
            className={`genre-item ${selectedGenre === genre.genre_id ? 'selected' : ''}`}
          >
            <p>{genre.genre_name}</p>
          </div>
        ))}
      </div>
      {books.map((book) => (
        <div key={book.book_id} className="book-item">
        <p className="book-title">{book.title}</p>
        <p className="book-info">Author: {book.author}</p>
        <p className="book-info">Price: ₹{book.price}</p>
        <button onClick={() => handleBuyClick(book.book_id, book.title)}>Buy</button>
      </div>
      ))}
    </div>
  );
}
