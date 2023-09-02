require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize Express.js
const app = express();

// Connect to MongoDB using the environment variable
mongoose.connect('mongodb+srv://vishal:123@cluster0.i9bluyo.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a schema for your data (e.g., User)
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Set up middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, etc.)
app.use(express.static(__dirname));

// Define a route to handle form submission
app.post('/submit', async (req, res) => {
  // Create a new user document
  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
  });

  try {
    // Save the user document to MongoDB using await
    await newUser.save();
    res.send('Registration successful!');
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred.');
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
