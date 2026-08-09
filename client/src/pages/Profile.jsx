import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { DEFAULT_STORIES } from "../constants/defaultStories";

const HEADER = (
  <header className="main-header">
    <div className="logo">
      Quillora
      <span className="logo-subtext">Love Bibliophile</span>
    </div>
    <nav className="main-nav">
      <NavLink to="/">HOME</NavLink>
      <NavLink to="/about">ABOUT</NavLink>
      <NavLink to="/explore">EXPLORE</NavLink>
      <NavLink to="/read">READ</NavLink>
      <NavLink to="/write">WRITE</NavLink>
      <NavLink to="/chatrooms">CHATROOMS</NavLink>
      <NavLink to="/signup" className="join-link">JOIN/SIGN IN</NavLink>
      <NavLink to="/profile" className="lang-link active">MY PROFILE</NavLink>
    </nav>
  </header>
);

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [myWorks, setMyWorks] = useState([]);
  const [readArticles, setReadArticles] = useState([]);
  
  // Selected article for reader modal
  const [selectedStory, setSelectedStory] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser && storedUser.username) {
        setUser(storedUser);

        // 1. Fetch authored works locally and from backend
        const localWorks = JSON.parse(localStorage.getItem("my_work_posts") || "[]");
        
        if (storedUser._id) {
          axios.get(`http://localhost:3000/api/posts/user/${storedUser._id}`)
            .then(res => {
              if (Array.isArray(res.data) && res.data.length > 0) {
                // Merge backend user posts with local saved drafts/posts
                const mergedMap = new Map();
                localWorks.forEach(w => mergedMap.set(w.title.toLowerCase(), w));
                res.data.forEach(p => mergedMap.set(p.title.toLowerCase(), p));
                setMyWorks(Array.from(mergedMap.values()));
              } else {
                setMyWorks(localWorks);
              }
            })
            .catch(err => {
              console.warn("Backend user posts fetch failed, falling back to local works:", err.message);
              setMyWorks(localWorks);
            });
        } else {
          setMyWorks(localWorks);
        }
      }

      // 2. Fetch read articles by other users
      axios.get("http://localhost:3000/api/posts")
        .then(res => {
          if (Array.isArray(res.data) && res.data.length > 0) {
            setReadArticles(res.data);
          } else {
            setReadArticles(DEFAULT_STORIES);
          }
        })
        .catch(() => {
          setReadArticles(DEFAULT_STORIES);
        });

    } catch (e) {
      console.error("Error reading stored user profile:", e);
    }
  }, []);

  // Open story reader modal
  const openStoryReader = (story) => {
    setSelectedStory(story);
    setLikeCount(story.likeCount || story.likes?.length || 12);
    setDislikeCount(story.dislikeCount || story.dislikes?.length || 1);
    setHasLiked(false);
    setHasDisliked(false);
  };

  // Close story reader modal
  const closeStoryReader = () => {
    setSelectedStory(null);
  };

  // Handle Like action
  const handleLike = async () => {
    if (hasLiked) return;

    setLikeCount(prev => prev + 1);
    setHasLiked(true);

    if (hasDisliked) {
      setDislikeCount(prev => Math.max(0, prev - 1));
      setHasDisliked(false);
    }

    if (selectedStory?._id && !selectedStory._id.startsWith('local_') && !selectedStory._id.startsWith('default_')) {
      try {
        await axios.post(`http://localhost:3000/api/posts/${selectedStory._id}/like`);
      } catch (err) {
        console.warn('Backend like call failed:', err.message);
      }
    }
  };

  // Handle Dislike action
  const handleDislike = async () => {
    if (hasDisliked) return;

    setDislikeCount(prev => prev + 1);
    setHasDisliked(true);

    if (hasLiked) {
      setLikeCount(prev => Math.max(0, prev - 1));
      setHasLiked(false);
    }

    if (selectedStory?._id && !selectedStory._id.startsWith('local_') && !selectedStory._id.startsWith('default_')) {
      try {
        await axios.post(`http://localhost:3000/api/posts/${selectedStory._id}/dislike`);
      } catch (err) {
        console.warn('Backend dislike call failed:', err.message);
      }
    }
  };

  return (
    <div className="profile-bg-wrapper">
      {HEADER}
      <div className="profile-container">
        {/* User Credential Profile Card */}
        <section className="profile-card">
          {user ? (
            <>
              <div className="profile-avatar">
                <span>{user.username ? user.username[0].toUpperCase() : "U"}</span>
              </div>
              <div className="profile-details">
                <h2>{user.username}</h2>
                <p className="profile-email">{user.email || "No email provided"}</p>
                <span className="profile-badge">Active Quillora Member</span>
              </div>
              <button
                className="logout-btn"
                onClick={() => {
                  localStorage.removeItem('user');
                  localStorage.removeItem('token');
                  setUser(null);
                  navigate('/login');
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <div style={{ textAlign: "center", width: "100%", padding: "1rem" }}>
              <h2 style={{ marginBottom: "1rem" }}>Not Signed In</h2>
              <p style={{ color: "#666", marginBottom: "1.5rem" }}>
                Sign in or create an account to view your profile and manage your writings.
              </p>
              <button
                className="logout-btn"
                onClick={() => navigate('/login')}
                style={{ marginTop: 0 }}
              >
                Sign In / Join
              </button>
            </div>
          )}
        </section>

        {/* My Work Section */}
        <section className="profile-section">
          <div className="section-title-bar">
            <h3>My Work ({myWorks.length})</h3>
            <span className="section-subtext">Click any story box to read your work</span>
          </div>
          <div className="work-list">
            {myWorks.length === 0 ? (
              <p className="empty-msg">No writing material yet. Write and save or publish a story to see it here!</p>
            ) : (
              myWorks.map((work, idx) => (
                <div
                  className="work-card clickable-card"
                  key={work._id || idx}
                  onClick={() => openStoryReader(work)}
                >
                  <div className="work-type-badge">{work.genre || work.type || "Story"}</div>
                  <div className="work-title">{work.title}</div>
                  <div className="work-snippet">{work.excerpt || work.content?.substring(0, 100) + '...'}</div>
                  <div className="work-footer">
                    <span className="work-date">
                      {work.createdAt ? new Date(work.createdAt).toLocaleDateString() : work.date || "Recent"}
                    </span>
                    <span className="read-btn-link">Read Story &rarr;</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Read Articles Section */}
        <section className="profile-section">
          <div className="section-title-bar">
            <h3>Read Articles & Stories</h3>
            <span className="section-subtext">Explore articles written by community members</span>
          </div>
          <div className="read-list">
            {readArticles.length === 0 ? (
              <p className="empty-msg">No articles or stories available right now.</p>
            ) : (
              readArticles.slice(0, 8).map((article, idx) => (
                <div
                  className="read-card clickable-card"
                  key={article._id || idx}
                  onClick={() => openStoryReader(article)}
                >
                  <div className="read-genre-badge">{article.genre || "Literature"}</div>
                  <div className="read-title">{article.title}</div>
                  <div className="read-snippet">{article.excerpt || article.content?.substring(0, 100) + '...'}</div>
                  <div className="read-meta">
                    by {typeof article.author === 'object' ? article.author?.username : article.author || 'Anonymous'}
                  </div>
                  <div className="read-card-footer">
                    <span className="read-btn-link">Read Story &rarr;</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      {/* Story Reader Modal */}
      {selectedStory && (
        <div className="story-modal-overlay" onClick={closeStoryReader}>
          <div className="story-modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={closeStoryReader}>&times;</button>
            <div className="modal-header">
              <span className="modal-genre-tag">{selectedStory.genre || 'Literature'}</span>
              <h2>{selectedStory.title}</h2>
              <div className="modal-meta">
                Written by <strong>{typeof selectedStory.author === 'object' ? selectedStory.author?.username : selectedStory.author || 'Quillora Author'}</strong>
              </div>
            </div>
            <div className="modal-body">
              <p className="modal-text">{selectedStory.content || selectedStory.excerpt || 'No content available for this story.'}</p>
            </div>
            
            {/* Interactive Likes & Dislikes Bar */}
            <div className="modal-reaction-bar">
              <span className="reaction-title">Did you enjoy this story?</span>
              <div className="reaction-buttons">
                <button
                  className={`like-btn ${hasLiked ? 'active' : ''}`}
                  onClick={handleLike}
                >
                  👍 Like ({likeCount})
                </button>
                <button
                  className={`dislike-btn ${hasDisliked ? 'active' : ''}`}
                  onClick={handleDislike}
                >
                  👎 Dislike ({dislikeCount})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .profile-bg-wrapper {
          min-height: 100vh;
          width: 100vw;
          background: #0d0d0d;
          color: #ffffff;
          padding-top: 7rem;
          box-sizing: border-box;
        }
        .main-header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 3rem 5rem;
          box-sizing: border-box;
          z-index: 10;
          background: rgba(0,0,0,0.85);
          backdrop-filter: blur(8px);
        }
        .logo {
          font-size: 2.5rem;
          font-weight: 700;
          color: #fff;
          font-family: 'Montserrat', sans-serif;
        }
        .logo-subtext {
          font-size: 0.8rem;
          font-weight: 400;
          letter-spacing: 0.1em;
          margin-left: 0.5rem;
        }
        .main-nav a {
          color: #ffffff;
          text-decoration: none;
          margin-left: 2.5rem;
          font-size: 1rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          transition: color 0.3s ease;
        }
        .main-nav a.active {
          color: #bee5ea;
          font-weight: 700;
        }
        .profile-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 2.5rem 1.5rem 5rem 1.5rem;
        }
        .profile-card {
          display: flex;
          align-items: center;
          background: #181818;
          border: 1px solid #2a2a2a;
          border-radius: 1.2rem;
          padding: 2rem 2.5rem;
          margin-bottom: 3rem;
          gap: 2.5rem;
          box-shadow: 0 8px 30px rgba(0,0,0,0.4);
        }
        .profile-avatar {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: #bee5ea;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.8rem;
          font-weight: 700;
          color: #111;
        }
        .profile-details h2 {
          font-size: 2rem;
          font-weight: 700;
          margin: 0 0 0.3rem 0;
          color: #fff;
        }
        .profile-email {
          font-size: 1.1rem;
          color: #aaa;
          margin-bottom: 0.5rem;
        }
        .profile-badge {
          background: #252525;
          color: #bee5ea;
          font-size: 0.85rem;
          padding: 0.3rem 0.8rem;
          border-radius: 12px;
          font-weight: 600;
        }
        .profile-section {
          margin-bottom: 3.5rem;
        }
        .section-title-bar {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid #2a2a2a;
          padding-bottom: 0.8rem;
        }
        .section-title-bar h3 {
          font-size: 1.6rem;
          font-weight: 700;
          margin: 0;
          color: #fff;
        }
        .section-subtext {
          color: #888;
          font-size: 0.95rem;
        }
        .work-list, .read-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        .clickable-card {
          background: #161616;
          border: 1px solid #282828;
          border-radius: 1.2rem;
          padding: 1.6rem;
          cursor: pointer;
          transition: transform 0.25s, border-color 0.25s, box-shadow 0.25s;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .clickable-card:hover {
          transform: translateY(-5px);
          border-color: #bee5ea;
          box-shadow: 0 10px 30px rgba(190, 229, 234, 0.15);
          background: #1e1e1e;
        }
        .work-type-badge, .read-genre-badge {
          font-size: 0.8rem;
          color: #bee5ea;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 0.6rem;
        }
        .work-title, .read-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 0.6rem;
          line-height: 1.4;
        }
        .work-snippet, .read-snippet {
          font-size: 0.95rem;
          color: #aaa;
          line-height: 1.5;
          margin-bottom: 1.2rem;
          flex: 1;
        }
        .work-footer, .read-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.85rem;
          color: #777;
          border-top: 1px solid #252525;
          padding-top: 0.8rem;
        }
        .read-btn-link {
          color: #bee5ea;
          font-weight: 700;
        }
        .logout-btn {
          background: #bee5ea;
          color: #111;
          border: none;
          border-radius: 0.7rem;
          padding: 0.7rem 1.5rem;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          margin-left: auto;
          transition: background 0.2s;
        }
        .logout-btn:hover {
          background: #fff;
        }

        /* Modal Styles */
        .story-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(6px);
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          box-sizing: border-box;
        }
        .story-modal-content {
          background: #141414;
          border: 1px solid #2e2e2e;
          border-radius: 1.5rem;
          max-width: 750px;
          width: 100%;
          max-height: 85vh;
          overflow-y: auto;
          padding: 2.5rem;
          position: relative;
          color: #fff;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
        }
        .close-modal-btn {
          position: absolute;
          top: 1.5rem;
          right: 1.8rem;
          background: none;
          border: none;
          color: #aaa;
          font-size: 2.2rem;
          cursor: pointer;
          transition: color 0.2s;
        }
        .close-modal-btn:hover {
          color: #bee5ea;
        }
        .modal-genre-tag {
          background: #bee5ea;
          color: #111;
          font-size: 0.8rem;
          font-weight: 700;
          padding: 0.3rem 0.8rem;
          border-radius: 12px;
          text-transform: uppercase;
        }
        .modal-header h2 {
          font-family: 'Playfair Display', serif;
          font-size: 2.2rem;
          margin: 1rem 0 0.5rem 0;
          color: #fff;
        }
        .modal-meta {
          color: #888;
          font-size: 0.95rem;
          margin-bottom: 2rem;
        }
        .modal-body {
          border-top: 1px solid #252525;
          border-bottom: 1px solid #252525;
          padding: 2rem 0;
          margin-bottom: 2rem;
        }
        .modal-text {
          font-size: 1.15rem;
          line-height: 1.8;
          color: #ddd;
          white-space: pre-line;
        }
        .modal-reaction-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .reaction-title {
          font-size: 1rem;
          font-weight: 600;
          color: #aaa;
        }
        .reaction-buttons {
          display: flex;
          gap: 1rem;
        }
        .like-btn, .dislike-btn {
          background: #222;
          border: 1px solid #333;
          color: #fff;
          padding: 0.6rem 1.2rem;
          border-radius: 0.7rem;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }
        .like-btn.active, .like-btn:hover {
          background: #bee5ea;
          color: #111;
          border-color: #bee5ea;
        }
        .dislike-btn.active, .dislike-btn:hover {
          background: #ef4444;
          color: #fff;
          border-color: #ef4444;
        }
      `}</style>
    </div>
  );
}