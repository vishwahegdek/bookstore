const express = require('express');
const zod = require('zod');
const jwt = require('jsonwebtoken');
const { query } = require('./db'); // Assuming db.js is in the same folder

const router = express.Router();
const key = 'my-key'
const signupBody = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

const adminSigninBody = zod.object({
  email: zod.string().email(),
  password: zod.string(),
});

router.post('/signup', async (req, res) => {
    const body = req.body;
    const { success, data } = signupBody.safeParse(body);
  
    if (!success) {
      return res.status(411).json({
        msg: 'Invalid inputs',
      });
    }
  
    const { username, password, firstName, lastName } = data;
  
    try {
      // Check if the user already exists
      const existingUser = await query('SELECT * FROM Customer WHERE username = ?', [username]);
  
      if (existingUser.length > 0) {
        return res.status(411).json({
          msg: 'Email already taken',
        });
      }
  
      // Insert the new user into the database
      await query('INSERT INTO Customer (first_name,last_name, username, password_hash,balance) VALUES (?, ? , ?,?,?)', [firstName,lastName, username,password,10000.00]);
  
      // You may want to hash the password before storing it in the database
  
      // Create a token for the new user
      const token = jwt.sign({
        username,
      }, key);
  
      res.status(200).json({
        msg: 'User created successfully',
        token,
      });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  });
  

router.post('/signin', async (req, res) => {
  const body = req.body;
  const { success, data } = signinBody.safeParse(body);

  if (!success) {
    return res.status(411).json({
      msg: 'Invalid inputs',
    });
  }

  const { username, password } = data;

  try {
    // Check if the user exists
    const existingUser = await query('SELECT * FROM Customer WHERE username = ? AND password_hash = ?', [username, password]);

    if (existingUser.length === 0) {
      return res.status(411).json({
        msg: 'Invalid credentials',
      });
    }

    // Create a token for the existing user
    const token = jwt.sign({
      username,
    },key);

    res.status(200).json({
      token,
    });
  } catch (error) {
    console.error('Error signing in:', error);
    res.status(500).json({
      error: 'Internal Server Error',
    });
  }
});

router.post('/adminsignin', async (req, res) => {
  const body = req.body;
  const { success, data } = adminSigninBody.safeParse(body);

  if (!success) {
    return res.status(411).json({
      msg: 'Invalid inputs',
    });
  }

  const { email, password } = data;
  try {
    // Check if the admin exists
    const existingUser = await query('SELECT * FROM Admin WHERE admin_email = ? AND password_hash = ?', [email, password]);
    console.log(existingUser)
    if (existingUser.length === 0) {
      return res.status(411).json({
        msg: 'Invalid credentials',
      });
    }

    // Create a token for the existing user
    const admintoken = jwt.sign({
      email,
    },key);
    console.log(admintoken)
    
    res.status(200).json({
      admintoken,
    });
  } catch (error) {
    console.error('Error signing in:', error);
    res.status(500).json({
      error: 'Internal Server Error',
    });
  }
});


module.exports = router;
