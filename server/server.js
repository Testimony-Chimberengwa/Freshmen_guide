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



// Get Events
app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 }); // Sort by date
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).send('Error fetching events');
  }
});

const User = mongoose.model('User', userSchema);
const Alumni = mongoose.model('Alumni', alumniSchema);
const Mentorship = mongoose.model('Mentorship', mentorshipSchema);
const Question = mongoose.model('Question', questionSchema);

// File Upload Configuration
const upload = multer({ dest: 'uploads/' });

// Routes

// Signup Route
app.post('/api/signup', async (req, res) => {
  try {
    const { email, username, password } = req.body;
    await User.create({ email, username, password });
    res.status(201).send('Account created!');
  } catch (error) {
    console.error('Error creating account:', error);
    res.status(500).send('Error creating account');
  }
});



app.post('/api/login', async (req, res) => {
  const { username, password, isAlumni } = req.body;
  const model = isAlumni ? Alumni : User;
  const user = await model.findOne({ username, password });
  if (user) {
      res.json({ username, id: user._id });
  } else {
      res.status(401).json({ error: 'Invalid username or password.' });
  }
});


// Create Mentorship Post
app.post('/api/mentorships', upload.single('image'), async (req, res) => {
  try {
    const { title, description, author } = req.body;
    const imagePath = `/uploads/${req.file.filename}`;
    const post = new Mentorship({ title, description, imagePath, author });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating mentorship post:', error);
    res.status(500).send('Error creating mentorship post');
  }
});

// Fetch Mentorship Posts by Author
app.get('/api/mentorships', async (req, res) => {
  try {
    const { author } = req.query;
    const posts = author
      ? await Mentorship.find({ author }).sort({ createdAt: -1 })
      : await Mentorship.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error('Error fetching mentorship posts:', error);
    res.status(500).send('Error fetching mentorship posts');
  }
});

// Edit Mentorship Post
app.put('/api/mentorships/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const updateData = { title, description };

    if (req.file) {
      updateData.imagePath = `/uploads/${req.file.filename}`;
    }

    const updatedPost = await Mentorship.findByIdAndUpdate(id, updateData, { new: true });
    res.json(updatedPost);
  } catch (error) {
    console.error('Error updating mentorship post:', error);
    res.status(500).send('Error updating mentorship post');
  }
});

// Delete Mentorship Post
app.delete('/api/mentorships/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Mentorship.findByIdAndDelete(id);
    res.status(200).send('Mentorship post deleted');
  } catch (error) {
    console.error('Error deleting mentorship post:', error);
    res.status(500).send('Error deleting mentorship post');
  }
});

// Questions Routes
// Create a Question
app.post('/api/questions', async (req, res) => {
  try {
    const { question, author } = req.body;
    const newQuestion = new Question({ question, author });
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    console.error('Error creating question:', error);
    res.status(500).send('Error creating question');
  }
});

// Fetch Questions for a Specific Author
app.get('/api/questions', async (req, res) => {
  try {
    const { author } = req.query;
    const questions = author
      ? await Question.find({ author }).sort({ createdAt: -1 })
      : await Question.find().sort({ createdAt: -1 });
    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).send('Error fetching questions');
  }
});

// Answer a Question
app.put('/api/questions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { answer, answeredBy } = req.body;
    const question = await Question.findByIdAndUpdate(
      id,
      { answer, answeredBy, answeredAt: new Date() },
      { new: true }
    );
    res.json(question);
  } catch (error) {
    console.error('Error answering question:', error);
    res.status(500).send('Error answering question');
  }
});

// Delete a Question
app.delete('/api/questions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Question.findByIdAndDelete(id);
    res.status(200).send('Question deleted');
  } catch (error) {
    console.error('Error deleting question:', error);
    res.status(500).send('Error deleting question');
  }
});

// Start the Server
app.listen(5000, () => console.log('Server running on http://localhost:5000'));
