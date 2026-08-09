const mongoose = require('mongoose');

const ChatMessageSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  recipient: {
    type: String,
    trim: true,
    default: null,
    index: true
  },
  room: {
    type: String,
    trim: true,
    default: null,
    index: true
  },
  text: {
    type: String,
    required: true,
    trim: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ChatMessage', ChatMessageSchema);
