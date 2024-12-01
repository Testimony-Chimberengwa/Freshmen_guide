const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Database Connection
mongoose.connect('mongodb://localhost:27017/freshmanGuide');

// Schemas
const userSchema = new mongoose.Schema({ username: String, email: String, password: String });
const alumniSchema = new mongoose.Schema({ username: String, password: String });

const mentorshipSchema = new mongoose.Schema({
  title: String,
  description: String,
  imagePath: String,
  author: String,
  createdAt: { type: Date, default: Date.now },
  ratings: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
  },
});




// Start the Server
app.listen(5000, () => console.log('Server running on http://localhost:5000'));