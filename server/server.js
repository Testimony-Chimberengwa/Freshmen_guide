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

app.post('/api/mentorships/rate', async (req, res) => {
    const { postId, rating } = req.body;
  
    try {
      const post = await Mentorship.findById(postId);
      if (!post) return res.status(404).send("Post not found");
  
      // Update the average rating
      const newCount = post.ratings.count + 1;
      const newAverage =
        (post.ratings.average * post.ratings.count + rating) / newCount;
  
      post.ratings.average = newAverage;
      post.ratings.count = newCount;
      await post.save();
  
      res.status(200).json({ average: newAverage, count: newCount });
    } catch (error) {
      console.error('Error updating rating:', error);
      res.status(500).send('Error updating rating');
    }
  });
  


  const questionSchema = new mongoose.Schema({
    question: String,
    answer: String,
    answeredBy: String,
    answeredAt: Date,
    author: String,
    createdAt: { type: Date, default: Date.now },
  });
  
  
  // Event Schema
  const eventSchema = new mongoose.Schema({
    eventName: String,
    date: Date,
    location: String,
  }); 
  
  
  
  
  const Event = mongoose.model('Event', eventSchema);


  // Add Event (for Admin)
app.post('/api/events', async (req, res) => {
    try {
      const { eventName, date, location } = req.body;
      const newEvent = new Event({ eventName, date, location });
      await newEvent.save();
      res.status(201).json(newEvent);
    } catch (error) {
      console.error('Error creating event:', error);
      res.status(500).send('Error creating event');
    }
  });
  

// Start the Server
app.listen(5000, () => console.log('Server running on http://localhost:5000'));