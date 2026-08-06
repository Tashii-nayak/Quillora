import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HEADER = (
  <header className="main-header">
    <div className="logo">
      Quillora
      <span className="logo-subtext">Love Bibliophile</span>
    </div>
    <nav className="main-nav">
      <a href="/index.html">HOME</a>
      <a href="/about.html">ABOUT</a>
      <a href="/explore.html">EXPLORE</a>
      <a href="/read.html">READ</a>
      <a href="/write.html">WRITE</a>
      <a href="/chatrooms.html">CHATROOMS</a>
      <a href="/signup" className="join-link">JOIN/SIGN IN</a>
      <a href="/profile" className="lang-link">MY PROFILE</a>
    </nav>
  </header>
);

export default function Profile() {
  // Simulate fetching user info from localStorage or context
  const [user, setUser] = useState({ username: "booklover42", email: "booklover@example.com" });
  const [myWorks, setMyWorks] = useState([
    { title: "The Midnight Library", type: "Story", date: "2024-05-01" },
    { title: "A Poem for Spring", type: "Poem", date: "2024-04-15" },
  ]);
  const [readArticles, setReadArticles] = useState([
    { title: "Why We Love Books", author: "Jane Doe", date: "2024-05-10" },
    { title: "The Art of Anonymous Writing", author: "John Smith", date: "2024-04-28" },
  ]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      fetch(`http://localhost:3000/users/${storedUser.username}/notes`)
        .then(res => res.json())
        .then(data => setMyWorks(data.notes || []));
    }
  }, []);

  return (
    <div className="profile-bg-wrapper">
      {HEADER}
      <div className="profile-container">
        <section className="profile-card">
          <div className="profile-avatar">
            <span>{user.username[0]?.toUpperCase() || "U"}</span>
          </div>
          <div className="profile-details">
            <h2>{user.username}</h2>
            <p className="profile-email">{user.email}</p>
          </div>
          <button className="logout-btn" onClick={() => {
            localStorage.removeItem('user');
            window.location.href = '/login'; // or your login route
          }}>
            Logout
          </button>
        </section>
        <section className="profile-section">
          <h3>My Work</h3>
          <div className="work-list">
            {myWorks.length === 0 ? (
              <p className="empty-msg">No writing material yet. Start writing!</p>
            ) : (
              myWorks.map((work, idx) => (
                typeof work === 'string' ? (
                  <div className="work-card" key={idx}>
                    <div className="work-title">{work}</div>
                  </div>
                ) : (
                  <div className="work-card" key={idx}>
                    <div className="work-type">{work.type}</div>
                    <div className="work-title">{work.title}</div>
                    <div className="work-date">{work.date}</div>
                  </div>
                )
              ))
            )}
          </div>
        </section>
        <section className="profile-section">
          <h3>Read Articles & Blogs</h3>
          <div className="read-list">
            {readArticles.length === 0 ? (
              <p className="empty-msg">No articles or blogs read yet.</p>
            ) : (
              readArticles.map((article, idx) => (
                <div className="read-card" key={idx}>
                  <div className="read-title">{article.title}</div>
                  <div className="read-meta">by {article.author} &middot; {article.date}</div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
      <style>{`
        .profile-bg-wrapper {
          min-height: 100vh;
          width: 100vw;
          background: linear-gradient(120deg,black 0%,gray 100%);
          padding-top: 7rem;
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
            transition: background-color 0.5s ease;
        }

        .main-header.scrolled {
            background-color: rgba(255, 255, 255, 0.9);
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
            font-family: 'Montserrat', sans-serif;
            margin-left: 0.5rem;
        }
       .main-nav a {
            color: #ffffff;
            text-decoration: none;
            margin-left: 2.5rem;
            font-size: 1rem;
            font-weight: 500;
            letter-spacing: 0.1em;
            transition: color 0.5s ease;
        }
        .main-nav a.active {
            color: rgb(140, 138, 138);
            font-weight: 700;
        }
        .main-nav .lang-link {
          font-weight: 700;
        }
        .profile-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 2.5rem 1.5rem 3rem 1.5rem;
        }
        .profile-card {
          display: flex;
          align-items: center;
          background: #fff;
          border-radius: 1.2rem;
          box-shadow: 0 2px 24px rgba(0,0,0,0.08);
          padding: 2rem 2.5rem;
          margin-bottom: 2.5rem;
          gap: 2.5rem;
        }
        .profile-avatar {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: linear-gradient(135deg, #bee5ea 0%, #a3d8e6 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.8rem;
          font-weight: 700;
          color: #fff;
          box-shadow: 0 2px 12px rgba(190,229,234,0.18);
        }
        .profile-details h2 {
          font-size: 2rem;
          font-weight: 700;
          margin: 0 0 0.3rem 0;
        }
        .profile-email {
          font-size: 1.1rem;
          color: #666;
        }
        .profile-section {
          margin-bottom: 2.2rem;
        }
        .profile-section h3 {
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 1.1rem;
          color: white;
        }
        .work-list, .read-list {
          display: flex;
          flex-wrap: wrap;
          gap: 1.2rem;
        }
        .work-card, .read-card {
          background: #fff;
          border-radius: 0.9rem;
          box-shadow: 0 2px 12px rgba(190,229,234,0.10);
          padding: 1.2rem 1.5rem;
          min-width: 220px;
          max-width: 320px;
          flex: 1 1 220px;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .work-type {
          font-size: 0.95rem;
          color: #bee5ea;
          font-weight: 700;
          text-transform: uppercase;
        }
        .work-title {
          font-size: 1.15rem;
          font-weight: 600;
          color: #222;
        }
        .work-date {
          font-size: 0.95rem;
          color: #888;
        }
        .read-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #222;
        }
        .read-meta {
          font-size: 0.95rem;
          color: #888;
        }
        .empty-msg {
          color: #aaa;
          font-style: italic;
          padding: 1.2rem 0;
        }
        .logout-btn {
          background: #bee5ea;
          color: #222;
          border: none;
          border-radius: 0.7rem;
          padding: 0.7rem 1.5rem;
          font-size: 1.1rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          cursor: pointer;
          margin-top: 1.5rem;
          transition: background 0.2s, color 0.2s;
        }
        .logout-btn:hover {
          background: #222;
          color: #fff;
        }
        @media (max-width: 700px) {
          .profile-card {
            flex-direction: column;
            gap: 1.2rem;
            padding: 1.2rem 1rem;
          }
          .profile-container {
            padding: 1.2rem 0.2rem 2rem 0.2rem;
          }
        }
      `}</style>
    </div>
  );
} 