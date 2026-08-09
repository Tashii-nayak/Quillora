import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MOODS = [
  { id: 'sad', label: '😢 Sad', description: 'Seeking quiet comfort and shared reflections' },
  { id: 'nostalgic', label: '🌙 Nostalgic', description: 'Reminiscing about lost moments and midnight memories' },
  { id: 'happy', label: '😊 Happy', description: 'Sharing warmth, light, and uplifting energy' },
  { id: 'hopeful', label: '🌱 Hopeful', description: 'Looking forward to new beginnings and fresh sunrises' },
  { id: 'raw', label: '🔥 Raw', description: 'Unfiltered, soul-baring truths without judgment' },
  { id: 'calm', label: '🧘 Calm', description: 'Finding peace and still reflections in the silence' }
];

export default function Chatrooms() {
  // Chatroom stage: 1 = Join Form, 2 = Mood Selection, 3 = Live Chat Dashboard
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [selectedMood, setSelectedMood] = useState('');
  const [error, setError] = useState('');
  
  // Active Chat Dashboard state
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [activeMoodFilter, setActiveMoodFilter] = useState('All');
  const [activeTarget, setActiveTarget] = useState({ type: 'room', id: '🌱 Hopeful', name: '#hopeful-lounge' });
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const messagesEndRef = useRef(null);

  // Pre-fill user data if logged in
  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser && storedUser.username) {
        setUsername(storedUser.username);
        if (storedUser.email) setEmail(storedUser.email);
        setPassword('••••••••');
      }
    } catch (e) {
      console.error('Error pre-filling user data:', e);
    }
  }, []);

  // Handle Step 1: Submit Registration Request
  const handleJoinSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Please enter your username.');
      return;
    }
    if (!acceptedTerms) {
      setError('You must accept the Community Guidelines and Privacy Policy.');
      return;
    }

    // Save chat credentials locally
    localStorage.setItem('chat_username', username.trim());
    localStorage.setItem('chat_email', email.trim());

    // Proceed to Step 2: Mood Selection
    setStep(2);
  };

  // Handle Step 2: Mandatory Mood Selection
  const handleMoodSelect = async (moodLabel) => {
    setSelectedMood(moodLabel);
    try {
      await axios.post('http://localhost:3000/api/chat/join', {
        username: username.trim(),
        email: email.trim(),
        mood: moodLabel
      });
    } catch (err) {
      console.warn('Backend chat join error, continuing client session:', err.message);
    }

    // Proceed to Step 3: Live Chat
    setStep(3);
  };

  // Poll online users & messages when in Step 3
  useEffect(() => {
    if (step !== 3) return;

    const fetchChatData = async () => {
      try {
        // Fetch online users by mood filter
        const usersRes = await axios.get('http://localhost:3000/api/chat/users', {
          params: { mood: activeMoodFilter }
        });
        if (Array.isArray(usersRes.data)) {
          setOnlineUsers(usersRes.data);
        }
      } catch (err) {
        console.warn('Error fetching online users:', err.message);
      }

      try {
        // Fetch messages for current active target (room or direct peer)
        const params = activeTarget.type === 'room' 
          ? { room: activeTarget.id }
          : { user1: username, user2: activeTarget.id };

        const msgRes = await axios.get('http://localhost:3000/api/chat/messages', { params });
        if (Array.isArray(msgRes.data)) {
          setMessages(msgRes.data);
        }
      } catch (err) {
        console.warn('Error fetching messages:', err.message);
      }
    };

    fetchChatData();
    const interval = setInterval(fetchChatData, 2000); // 2-second real-time sync

    return () => clearInterval(interval);
  }, [step, activeMoodFilter, activeTarget, username]);

  // Auto scroll messages to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Send Message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isSending) return;

    const text = inputMessage.trim();
    setInputMessage('');
    setIsSending(true);

    const payload = {
      sender: username,
      text,
      ...(activeTarget.type === 'room' ? { room: activeTarget.id } : { recipient: activeTarget.id })
    };

    // Optimistic UI update
    const tempMsg = {
      id: 'temp_' + Date.now(),
      sender: username,
      text,
      timestamp: new Date().toISOString(),
      ...(activeTarget.type === 'room' ? { room: activeTarget.id } : { recipient: activeTarget.id })
    };
    setMessages(prev => [...prev, tempMsg]);

    try {
      await axios.post('http://localhost:3000/api/chat/messages', payload);
    } catch (err) {
      console.warn('Error sending message to server:', err.message);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <Header />

      {/* STEP 1: Registration Form */}
      {step === 1 && (
        <section className="chatroom-join-section">
          <div className="chatroom-join-left">
            <div className="chatroom-logo" style={{ color: 'white', fontSize: '2.6rem' }}>Quillora</div>
            <h1 style={{ color: 'white' }}>Join <span className="brand">Quillora</span> <span className="italic">Chatroom</span></h1>
            <p className="offers-caption" style={{ color: '#888', fontStyle: 'italic', fontSize: '1.4rem' }}>
              Connect pseudonomously with real people online. Share unfiltered feelings in safe, quiet spaces.
            </p>
          </div>
          <div className="chatroom-join-right">
            <h2>Submit a request to join</h2>
            <form className="chatroom-join-form" onSubmit={handleJoinSubmit}>
              <input
                type="text"
                placeholder="User Name"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email_id"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <div className="form-row">
                <input
                  type="checkbox"
                  id="accept"
                  checked={acceptedTerms}
                  onChange={e => setAcceptedTerms(e.target.checked)}
                  required
                />
                <label htmlFor="accept">
                  <span style={{ color: 'black' }}>I accept the </span>
                  <a href="#" style={{ color: '#888' }}>Community Guidelines</a>
                  <span style={{ color: 'black' }}> and </span>
                  <a href="#" style={{ color: '#888' }}>Privacy Policy</a>.
                </label>
              </div>
              {error && <div style={{ color: '#d33', marginTop: '0.5rem' }}>{error}</div>}
              <button type="submit" className="submit-btn">JOIN THE CHATROOM</button>
            </form>
          </div>
        </section>
      )}

      {/* STEP 2: Mandatory Mood Selection */}
      {step === 2 && (
        <section className="chatroom-mood-section">
          <div className="mood-selection-container">
            <span className="mood-badge-tag">STEP 2 OF 2</span>
            <h1>How are you feeling right now?</h1>
            <p className="mood-subhead">
              Select your active mood to enter the chatroom. Other pseudonymous members will connect with you based on how you feel.
            </p>
            <div className="mood-cards-grid">
              {MOODS.map(m => (
                <div
                  key={m.id}
                  className="mood-select-card"
                  onClick={() => handleMoodSelect(m.label)}
                >
                  <div className="mood-icon-title">{m.label}</div>
                  <p className="mood-desc">{m.description}</p>
                  <button className="select-mood-btn">Enter as {m.label}</button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* STEP 3: Live Chat Dashboard & Real-Time Conversations */}
      {step === 3 && (
        <section className="chat-dashboard-section">
          {/* User Status Bar */}
          <div className="chat-user-bar">
            <div className="user-info">
              <div className="user-avatar-badge">{username[0]?.toUpperCase() || 'U'}</div>
              <div>
                <span className="user-handle">{username}</span>
                <span className="current-mood-tag">Mood: {selectedMood}</span>
              </div>
            </div>
            <button
              className="change-mood-btn"
              onClick={() => setStep(2)}
            >
              🔄 Change Mood
            </button>
          </div>

          <div className="chat-dashboard-container">
            {/* Left Sidebar: Online Pseudonymous Users Directory */}
            <div className="chat-sidebar">
              <div className="sidebar-section-title">
                <h3>Online Pseudonyms ({onlineUsers.length})</h3>
                <p>Filter by active mood:</p>
              </div>

              {/* Mood Filter Pills */}
              <div className="mood-filter-pills">
                {['All', '😢 Sad', '🌙 Nostalgic', '😊 Happy', '🌱 Hopeful', '🔥 Raw', '🧘 Calm'].map(f => (
                  <button
                    key={f}
                    className={`mood-pill ${activeMoodFilter === f ? 'active' : ''}`}
                    onClick={() => setActiveMoodFilter(f)}
                  >
                    {f}
                  </button>
                ))}
              </div>

              {/* Group Mood Channels */}
              <div className="channels-group">
                <div className="group-label">MOOD LOUNGES</div>
                {['😢 Sad', '🌙 Nostalgic', '😊 Happy', '🌱 Hopeful', '🔥 Raw', '🧘 Calm'].map(m => (
                  <div
                    key={m}
                    className={`channel-item ${activeTarget.type === 'room' && activeTarget.id === m ? 'active' : ''}`}
                    onClick={() => setActiveTarget({ type: 'room', id: m, name: `# ${m} Lounge` })}
                  >
                    <span>💬 #{m} Lounge</span>
                  </div>
                ))}
              </div>

              {/* Online Users List */}
              <div className="users-group">
                <div className="group-label">PEERS ONLINE</div>
                {onlineUsers.length === 0 ? (
                  <div className="no-peers">No peers found matching this mood filter.</div>
                ) : (
                  onlineUsers
                    .filter(u => u.username.toLowerCase() !== username.toLowerCase())
                    .map(u => (
                      <div
                        key={u.username}
                        className={`user-list-card ${activeTarget.type === 'peer' && activeTarget.id === u.username ? 'active' : ''}`}
                        onClick={() => setActiveTarget({ type: 'peer', id: u.username, name: `@ ${u.username}` })}
                      >
                        <div className="status-dot"></div>
                        <div className="user-card-meta">
                          <div className="peer-name">{u.username}</div>
                          <div className="peer-mood-badge">{u.mood}</div>
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>

            {/* Right Chat Messaging Area */}
            <div className="chat-main-area">
              <div className="chat-header">
                <h2>{activeTarget.name}</h2>
                <span className="chat-subtitle">
                  {activeTarget.type === 'room'
                    ? 'Public group conversation for this mood atmosphere'
                    : '1-on-1 private pseudonymous chat with real online user'}
                </span>
              </div>

              {/* Messages Stream */}
              <div className="messages-container">
                {messages.length === 0 ? (
                  <div className="empty-messages">
                    <p>No messages yet in this space.</p>
                    <p className="subtext">Say hello and start sharing your honest thoughts.</p>
                  </div>
                ) : (
                  messages.map((m, idx) => {
                    const isSelf = m.sender?.toLowerCase() === username.toLowerCase();
                    return (
                      <div key={m.id || idx} className={`message-bubble-row ${isSelf ? 'self' : 'other'}`}>
                        <div className="message-bubble">
                          {!isSelf && <div className="message-sender">{m.sender}</div>}
                          <div className="message-text">{m.text}</div>
                          <div className="message-time">
                            {m.timestamp ? new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Composer */}
              <form className="message-composer" onSubmit={handleSendMessage}>
                <input
                  type="text"
                  placeholder={`Write your message to ${activeTarget.name}...`}
                  value={inputMessage}
                  onChange={e => setInputMessage(e.target.value)}
                />
                <button type="submit" disabled={!inputMessage.trim() || isSending}>
                  Send &rarr;
                </button>
              </form>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}
