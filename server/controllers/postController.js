const Post = require('../models/Post');

const normalizeGenreValue = (genre = '') => {
  const value = String(genre || '').trim();

  if (!value) {
    return '';
  }

  const genreMap = {
    fantasy: 'Fantasy',
    scifi: 'Science Fiction',
    'science fiction': 'Science Fiction',
    dystopian: 'Dystopian',
    adventure: 'Action & Adventure',
    'action & adventure': 'Action & Adventure',
    mystery: 'Mystery',
    horror: 'Horror',
    thriller: 'Thriller',
    historical: 'Historical Fiction',
    'historical fiction': 'Historical Fiction',
  };

  return genreMap[value.toLowerCase()] || value;
};

const calculateReadingTime = (content = '') => {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return words > 0 ? Math.max(1, Math.ceil(words / 200)) : 1;
};

const normalizeTags = (tags) => {
  if (Array.isArray(tags)) {
    return tags.map((tag) => String(tag).trim()).filter(Boolean);
  }

  if (typeof tags === 'string') {
    return tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  return [];
};

exports.publishPost = async (req, res) => {
  try {
    const {
      title,
      excerpt,
      content,
      coverImage,
      genre,
      tags,
      author: authorFromBody,
    } = req.body;

    const titleValue = typeof title === 'string' ? title.trim() : '';
    const contentValue = typeof content === 'string' ? content.trim() : '';
    const genreValue = normalizeGenreValue(typeof genre === 'string' ? genre : '');
    const authorValue = authorFromBody || req.user?._id || req.user?.id;

    if (!titleValue || !contentValue || !genreValue) {
      return res.status(400).json({ message: 'Title, content, and genre are required.' });
    }

    if (!authorValue) {
      return res.status(400).json({ message: 'Author is required.' });
    }

    const excerptValue = typeof excerpt === 'string' && excerpt.trim()
      ? excerpt.trim()
      : contentValue.length > 160
        ? `${contentValue.slice(0, 157)}...`
        : contentValue;

    const post = await Post.create({
      title: titleValue,
      excerpt: excerptValue,
      content: contentValue,
      coverImage: typeof coverImage === 'string' ? coverImage.trim() : '',
      genre: genreValue,
      tags: normalizeTags(tags),
      readingTime: calculateReadingTime(contentValue),
      author: authorValue,
      isOfficial: false,
      isEditorsPick: false,
      isPinned: false,
      featured: false,
    });

    const populatedPost = await post.populate('author', 'username email profilePicture');

    res.status(201).json(populatedPost);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Invalid post data.', error: error.message });
    }

    res.status(500).json({ message: 'Unable to create post', error: error.message });
  }
};

exports.createPost = exports.publishPost;

exports.getAllPosts = async (req, res) => {
  try {
    const filter = {};

    if (req.query.genre) {
      filter.genre = normalizeGenreValue(req.query.genre);
    }

    const posts = await Post.find(filter)
      .populate('author', 'username email profilePicture')
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch posts', error: error.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username email profilePicture');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.views += 1;
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch post', error: error.message });
  }
};

exports.getEditorsPick = async (req, res) => {
  try {
    const posts = await Post.find({ isEditorsPick: true })
      .populate('author', 'username email profilePicture')
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch editor picks', error: error.message });
  }
};

exports.getLatestPosts = async (req, res) => {
  try {
    const filter = {};

    if (req.query.genre) {
      filter.genre = normalizeGenreValue(req.query.genre);
    }

    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.max(1, Math.min(20, parseInt(req.query.limit, 10) || 3));
    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      Post.find(filter)
        .populate('author', 'username email profilePicture')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Post.countDocuments(filter),
    ]);

    res.status(200).json({
      posts,
      hasMore: skip + posts.length < total,
    });
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch latest posts', error: error.message });
  }
};

exports.getTrendingPosts = async (req, res) => {
  try {
    const filter = {};

    if (req.query.genre) {
      filter.genre = normalizeGenreValue(req.query.genre);
    }

    const posts = await Post.find(filter)
      .populate('author', 'username email profilePicture')
      .sort({ views: -1, 'createdAt': -1, createdAt: -1 })
      .limit(10);

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch trending posts', error: error.message });
  }
};

exports.getPostsByGenre = async (req, res) => {
  try {
    const genre = normalizeGenreValue(req.params.genre || req.query.genre);

    if (!genre) {
      return res.status(400).json({ message: 'Genre is required.' });
    }

    const posts = await Post.find({ genre })
      .populate('author', 'username email profilePicture')
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch posts by genre', error: error.message });
  }
};

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.likeCount = (post.likeCount || 0) + 1;
    await post.save();

    res.json({ message: 'Post liked', likeCount: post.likeCount, dislikeCount: post.dislikeCount || 0 });
  } catch (error) {
    res.status(500).json({ message: 'Error liking post', error: error.message });
  }
};

exports.dislikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.dislikeCount = (post.dislikeCount || 0) + 1;
    await post.save();

    res.json({ message: 'Post disliked', likeCount: post.likeCount || 0, dislikeCount: post.dislikeCount });
  } catch (error) {
    res.status(500).json({ message: 'Error disliking post', error: error.message });
  }
};

exports.getUserPosts = async (req, res) => {
  try {
    const { authorId } = req.params;
    const posts = await Post.find({ author: authorId })
      .populate('author', 'username email profilePicture')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch user posts', error: error.message });
  }
};

