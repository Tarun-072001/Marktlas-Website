// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'your-secret-key';

app.use(cors());
app.use(bodyParser.json());

// Database file path
const DB_PATH = path.join(__dirname, 'db.json');

// Initialize database if it doesn't exist
if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, JSON.stringify({
    users: [],
    students: []
  }, null, 2));
}

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password'
  }
});

// Helper functions
const readDB = () => JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
const writeDB = (data) => fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

// Routes
app.post('/api/auth/register', (req, res) => {
  const db = readDB();
  const { email, password, ...userData } = req.body;
  
  // Check if user already exists
  if (db.users.some(user => user.email === email)) {
    return res.status(400).json({ message: 'Email already registered' });
  }

  // Create verification token
  const verificationToken = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1d' });

  // Create new user
  const newUser = {
    id: db.users.length + 1,
    email,
    password, // In production, hash the password before saving
    isVerified: false,
    verificationToken,
    ...userData
  };

  db.users.push(newUser);
  writeDB(db);

  // Send verification email
  const verificationLink = `http://localhost:4200/verify-email?token=${verificationToken}`;
  
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Verify Your Email',
    html: `<p>Please click <a href="${verificationLink}">here</a> to verify your email.</p>`
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.error('Error sending email:', error);
    }
  });

  res.status(201).json(newUser);
});

app.post('/api/auth/login', (req, res) => {
  const db = readDB();
  const { email, password } = req.body;
  
  const user = db.users.find(u => u.email === email);
  
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  
  if (user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  
  if (!user.isVerified) {
    return res.status(401).json({ message: 'Email not verified' });
  }
  
  const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
  
  res.json({ token, user });
});

app.get('/api/auth/verify-email', (req, res) => {
  const { token } = req.query;
  
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const db = readDB();
    
    const user = db.users.find(u => u.email === decoded.email);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (user.verificationToken !== token) {
      return res.status(400).json({ message: 'Invalid token' });
    }
    
    user.isVerified = true;
    user.verificationToken = undefined;
    writeDB(db);
    
    res.json({ message: 'Email verified successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Invalid or expired token' });
  }
});

app.post('/api/auth/forgot-password', (req, res) => {
  const { email } = req.body;
  const db = readDB();
  
  const user = db.users.find(u => u.email === email);
  
  if (!user) {
    return res.status(404).json({ message: 'Email not found' });
  }
  
  const resetToken = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
  user.resetToken = resetToken;
  writeDB(db);
  
  // Send reset email
  const resetLink = `http://localhost:4200/reset-password?token=${resetToken}`;
  
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Password Reset',
    html: `<p>Please click <a href="${resetLink}">here</a> to reset your password.</p>`
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ message: 'Failed to send reset email' });
    }
    res.json({ message: 'Reset email sent' });
  });
});

app.post('/api/auth/reset-password', (req, res) => {
  const { token, newPassword } = req.body;
  
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const db = readDB();
    
    const user = db.users.find(u => u.id === decoded.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (user.resetToken !== token) {
      return res.status(400).json({ message: 'Invalid token' });
    }
    
    user.password = newPassword;
    user.resetToken = undefined;
    writeDB(db);
    
    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Invalid or expired token' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});