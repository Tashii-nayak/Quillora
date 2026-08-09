const express = require('express');
const router = express.Router();
const ChatUser = require('../models/ChatUser');
const ChatMessage = require('../models/ChatMessage');

// Default initial pseudonymous peers seed
const DEFAULT_PEERS = [
  { username: 'Silent_Owl', email: 'owl@quillora.com', mood: '🌙 Nostalgic', isOnline: true, bio: 'Here to listen in quiet midnight moments.' },
  { username: 'Midnight_Muse', email: 'muse@quillora.com', mood: '🔥 Raw', isOnline: true, bio: 'Expressing unfiltered thoughts without fear.' },
  { username: 'Echoing_Ember', email: 'ember@quillora.com', mood: '🌱 Hopeful', isOnline: true, bio: 'Believing in fresh starts and sunrises.' },
  { username: 'Velvet_Shadow', email: 'shadow@quillora.com', mood: '😢 Sad', isOnline: true, bio: 'Seeking comfort in shared quietness.' },
  { username: 'Lunar_Latte', email: 'latte@quillora.com', mood: '😊 Happy', isOnline: true, bio: 'Spreading warmth and good energy today.' },
  { username: 'Whispering_Leaf', email: 'leaf@quillora.com', mood: '🧘 Calm', isOnline: true, bio: 'Reflecting on peace and stillness.' }
];

// Helper to seed default peers in MongoDB if empty
async function ensureDefaultPeersInDB() {
  try {
    for (const peer of DEFAULT_PEERS) {
      await ChatUser.findOneAndUpdate(
        { username: peer.username },
        { ...peer, lastSeen: new Date() },
        { upsert: true, new: true }
      );
    }
  } catch (err) {
    console.error('Error seeding default peers in MongoDB:', err.message);
  }
}

// POST /api/chat/join - Register/Upsert user in MongoDB
router.post('/join', async (req, res) => {
  try {
    const { username, email, mood } = req.body;
    if (!username) {
      return res.status(400).json({ message: 'Username is required to join chatroom.' });
    }

    await ensureDefaultPeersInDB();

    const user = await ChatUser.findOneAndUpdate(
      { username: username.trim() },
      {
        username: username.trim(),
        email: email ? email.trim() : `${username.trim().toLowerCase()}@quillora.com`,
        mood: mood || '🧘 Calm',
        isOnline: true,
        lastSeen: new Date()
      },
      { upsert: true, new: true }
    );

    res.json({ message: 'Joined chatroom successfully and saved to MongoDB', user });
  } catch (error) {
    res.status(500).json({ message: 'Unable to join chatroom', error: error.message });
  }
});

// POST /api/chat/mood - Update active mood in MongoDB
router.post('/mood', async (req, res) => {
  try {
    const { username, mood } = req.body;
    if (!username || !mood) {
      return res.status(400).json({ message: 'Username and mood are required.' });
    }

    const user = await ChatUser.findOneAndUpdate(
      { username: username.trim() },
      {
        mood: mood.trim(),
        isOnline: true,
        lastSeen: new Date()
      },
      { upsert: true, new: true }
    );

    res.json({ message: 'Mood updated in MongoDB successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Unable to update mood', error: error.message });
  }
});

// GET /api/chat/users - Fetch online users from MongoDB by mood
router.get('/users', async (req, res) => {
  try {
    await ensureDefaultPeersInDB();

    const moodFilter = req.query.mood;
    const filter = {};

    if (moodFilter && moodFilter !== 'All') {
      filter.mood = { $regex: moodFilter.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), $options: 'i' };
    }

    const users = await ChatUser.find(filter).sort({ lastSeen: -1 }).limit(50);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch users from MongoDB', error: error.message });
  }
});

// GET /api/chat/messages - Fetch messages from MongoDB
router.get('/messages', async (req, res) => {
  try {
    const { user1, user2, room } = req.query;

    let filter = {};

    if (room) {
      filter = { $or: [{ room }, { recipient: room }] };
    } else if (user1 && user2) {
      filter = {
        $or: [
          { sender: new RegExp(`^${user1}$`, 'i'), recipient: new RegExp(`^${user2}$`, 'i') },
          { sender: new RegExp(`^${user2}$`, 'i'), recipient: new RegExp(`^${user1}$`, 'i') }
        ]
      };
    }

    let messages = await ChatMessage.find(filter).sort({ createdAt: 1 }).limit(100);

    // If room is empty, seed initial welcome message into MongoDB
    if (room && messages.length === 0) {
      const initialMsg = await ChatMessage.create({
        sender: 'Quillora_Guide',
        room,
        text: `Welcome to the ${room} lounge! Share your thoughts and connect with pseudonymous peers who feel the same way.`,
        timestamp: new Date()
      });
      messages = [initialMsg];
    }

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch messages from MongoDB', error: error.message });
  }
});

// POST /api/chat/messages - Save new chat message to MongoDB
router.post('/messages', async (req, res) => {
  try {
    const { sender, recipient, room, text } = req.body;
    if (!sender || !text || (!recipient && !room)) {
      return res.status(400).json({ message: 'Sender, text, and target (recipient or room) are required.' });
    }

    const newMessage = await ChatMessage.create({
      sender: sender.trim(),
      recipient: recipient ? recipient.trim() : null,
      room: room ? room.trim() : null,
      text: text.trim(),
      timestamp: new Date()
    });

    // Update sender's lastSeen timestamp in MongoDB
    await ChatUser.findOneAndUpdate(
      { username: sender.trim() },
      { lastSeen: new Date(), isOnline: true }
    );

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: 'Unable to save message to MongoDB', error: error.message });
  }
});

module.exports = router;
