const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.get('/editor-picks', postController.getEditorsPick);
router.get('/latest', postController.getLatestPosts);
router.get('/trending', postController.getTrendingPosts);
router.get('/genre/:genre', postController.getPostsByGenre);
router.get('/', (req, res) => {
  if (req.query.genre) {
    return postController.getPostsByGenre(req, res);
  }
  return postController.getAllPosts(req, res);
});
router.get('/:id', postController.getPostById);
router.post('/', async (req, res) => {
  if (!req.is('application/json')) {
    return res.status(400).json({ message: 'Content-Type must be application/json.' });
  }

  try {
    await postController.publishPost(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Unable to create post', error: error.message });
  }
});

module.exports = router;
