import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  
  const handleSignout = () => {
    localStorage.setItem('admintoken', '');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let token = localStorage.getItem("admintoken");
        if (!token) {
          navigate('/adminsignin'); // Redirect to admin signin page if token is not present
          return;
        }

        const response = await axios.get(
          'http://localhost:3000/system-stats',
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          }
        );
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div className='background-image'>
      <button onClick={handleSignout}>Sign Out</button>
      <br /><br /><br />
      <div className='stats'>
        <div>
          Total Users {data.totalUsers}
        </div>
        <div>
          Total Books {data.totalBooks}
        </div>
        <div>
          Total Book's Genre {data.totalGenres}
        </div>
      </div>
      <br /><br /><br /><br />
      <div className='heading'>Manage</div>
      <div className='manage'>
        <div onClick={() => { navigate('/editusers') }}>
          Users
        </div>
        <div onClick={() => { navigate('/editbooks') }}>
          Books
        </div>
        {/* <div onClick={() => { navigate('/editgenres') }}>
          Genres
        </div> */}
      </div>
    </div>
  );
};

export default Admin;
