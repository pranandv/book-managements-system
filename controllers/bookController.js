const Book = require('../models/book');

exports.publishBook = async (req, res) => {
  try {
    const { title, author, description } = req.body;

    const newBook = await Book.create({
      title,
      author,
      description,
      publishedBy: req.user.username, // Assuming the user ID is stored in req.user.id after JWT verification
    });

    res.status(201).json({ status:"success",message: 'Book published successfully', data: newBook.title });
  } catch (error) {
    res.status(500).json({status:"fail", error: error.message });
  }
};

// Search for books by title
exports.searchBooks = async (req, res) => {
  try {
    const { title } = req.query;

    const books = await Book.find({ title: { $regex: title, $options: 'i' } });

    res.status(200).json({status:"success", data: books });
  } catch (error) {
    res.status(500).json({ status:"fail",error: error.message });
  }
};

// Unpublish a book
exports.unpublishBook = async (req, res) => {
  try {
    const { bookId } = req.params;

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ status:"fail",message: 'Book not found' });
    }

    if (String(book.publishedBy) !== req.user.username) {
      return res.status(403).json({status:"fail", message: 'Unauthorized to unpublish this book' });
    }

    await Book.findByIdAndDelete(bookId);

    res.status(200).json({ status:"success",message: 'Book unpublished successfully' });
  } catch (error) {
    res.status(500).json({ status:"fail", error: error.message });
  }
};

// Get a list of books published by the current user
exports.getUserBooks = async (req, res) => {
  try {
   
    const userBooks = await Book.find({ publishedBy: req.user.username });

    res.status(200).json({ status:"success",data: userBooks });
  } catch (error) {
    res.status(500).json({ status:"fail",error: error.message });
  }
};

// Get a list of all published books
exports.getAllPublishedBooks = async (req, res) => {
  try {
    const allBooks = await Book.find();

    res.status(200).json({ status:"success",data: allBooks });
  } catch (error) {
    res.status(500).json({ status:"fail",error: error.message });
  }
};

module.exports = exports;
