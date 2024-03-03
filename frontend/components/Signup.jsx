import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/signup', formData);
      console.log(response.data);
      // Handle success (redirect, show a message, etc.)
      localStorage.setItem("token", response.data.token)
      navigate("/")
    } catch (error) {
      console.error('Error signing up:', error.response.data);
      // Handle error (show an error message, etc.)
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Sign Up</h2>
      <form style={styles.form} onSubmit={handleSignUp}>
        <label style={styles.label}>
          First Name:
          <input type="text" name="firstName" style={styles.input} onChange={handleInputChange} />
        </label>
        <br />
        <label style={styles.label}>
          Last Name:
          <input type="text" name="lastName" style={styles.input} onChange={handleInputChange} />
        </label>
        <br />
        <label style={styles.label}>
          Username (Email):
          <input type="email" name="username" style={styles.input} onChange={handleInputChange} />
        </label>
        <br />
        <label style={styles.label}>
          Password:
          <input type="password" name="password" style={styles.input} onChange={handleInputChange} />
        </label>
        <br />
        <button type="submit" style={styles.button}>Sign Up</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  form: {
    backgroundColor: '#f0f0f0',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  label: {
    display: 'block',
    margin: '10px 0',
  },
  input: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    backgroundColor: '#4caf50',
    color: 'white',
    padding: '10px 15px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
  },
};

export default Signup;
