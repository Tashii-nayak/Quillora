const Comment = require('../models/Comment');
const Post = require('../models/Post');

exports.addComment = async (req, res) => {
  try {
    const { postId, userId, content } = req.body;

    if (!postId || !userId || !content) {
      return res.status(400).json({ message: 'Post ID, user ID, and content are required.' });
    }

    const comment = await Comment.create({
      post: postId,
      user: userId,
      content,
    });

    await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } });

    const populatedComment = await comment.populate('user', 'username email profilePicture');

    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(500).json({ message: 'Unable to add comment', error: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    await Comment.findByIdAndDelete(id);
    await Post.findByIdAndUpdate(comment.post, { $pull: { comments: id } });

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Unable to delete comment', error: error.message });
  }
};

exports.getComments = async (req, res) => {
  try {
    const { postId } = req.query;

    if (!postId) {
      return res.status(400).json({ message: 'Post ID is required.' });
    }

    const comments = await Comment.find({ post: postId })
      .populate('user', 'username email profilePicture')
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch comments', error: error.message });
  }
};
