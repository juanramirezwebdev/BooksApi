// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/books', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a simple Book schema
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
});

const Book = mongoose.model('Book', bookSchema);

// API endpoint to get all books
app.get('/api/books', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// API endpoint to add a new book
app.post('/api/books', async (req, res) => {
  const { title, author } = req.body;
  const newBook = new Book({ title, author });
  await newBook.save();
  res.json(newBook);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
