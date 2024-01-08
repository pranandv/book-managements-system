const express = require('express');
const bookController = require('../controllers/bookController');

const router = express.Router();

router.post('/publish', bookController.publishBook);
router.get('/search', bookController.searchBooks);
router.put('/unpublish/:bookId', bookController.unpublishBook);
router.get('/user', bookController.getUserBooks);
router.get('/published', bookController.getAllPublishedBooks);

module.exports = router;
