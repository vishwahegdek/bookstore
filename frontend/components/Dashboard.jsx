import React, { useState, useEffect } from 'react';
import './styles.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
//import Bg from "./Bg";

export default function Dashboard() {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(1);
  const [books, setBooks] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      fetch('http://localhost:3000/firstname', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedToken}`
        }
      }).then(async (res) => {
        const json = await res.json();
        setLoggedInUser(json.firstName);
      });
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

  const handleLogout = () => {
    localStorage.setItem("token", "")
    window.location.reload(false);
  }

  

  return (
    <div className='background-image'>
      <div className='navbar'>
        {loggedInUser ? (
          <>
            <p><strong>Hello, {loggedInUser}!</strong></p>
            <button onClick={() => navigate("/account")}>Account</button>
            <button onClick={handleLogout}>Log Out</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate("/signin")}>Sign In</button>
            <button onClick={() => navigate("/signup")}>Sign Up</button>
          </>
        )}
        <button onClick={()=>{navigate('/admin')}}>Admin</button>
      </div>
      

      <div className='heading'>Books by Genres</div>
      <div className='genres'>
        {genres.map((genre) => (
          <div
            key={genre.genre_id}
            onClick={() => handleGenreClick(genre.genre_id)}
            className='genre'
          >
            <p>{genre.genre_name}</p>
          </div>
        ))}
      </div>
      <div>
        {books.map((book) => (
          <div>
            <div key={book.book_id} className='book' onClick={() => navigate(`/buybook/${book.book_id}`)}>
            <div>
              <img src={`http://localhost:3000${book.imageUrl}`} alt={book.title} />
            </div>
            <div className='description'>
              <h3>{book.title}</h3>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Price:</strong> ₹{book.price}</p>
            </div>
          </div>
          <hr />
          </div>
        ))}
      </div>
      
    </div>
  );
}
