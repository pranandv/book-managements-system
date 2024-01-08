const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  publishedBy: {
    type: String,
    ref: 'User',
  },
});

module.exports = mongoose.model('Book', bookSchema);