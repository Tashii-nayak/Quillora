const mongoose = require('mongoose');

const ChatUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    default: ''
  },
  mood: {
    type: String,
    default: '🧘 Calm'
  },
  isOnline: {
    type: Boolean,
    default: true
  },
  bio: {
    type: String,
    default: 'Quillora member sharing thoughts and feelings.'
  },
  lastSeen: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ChatUser', ChatUserSchema);
