import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
      <a href="/signup">JOIN/SIGNUP</a>
      <a href="#" className="lang-link">MY PROFILE</a>
    </nav>
  </header>
);

const usernameSuggestions = [
  "octopus_diva",
  "silent_owl",
  "midnight_muse",
  "paperplane42",
  "velvet_shadow",
  "echoing_ember",
  "pixel_pirate",
  "lunar_latte",
  "mystic_mango",
  "whispering_leaf"
];

function getRandomUsername() {
  return usernameSuggestions[Math.floor(Math.random() * usernameSuggestions.length)];
}

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [suggestion, setSuggestion] = useState(getRandomUsername());
  const navigate = useNavigate();

  const handleSuggestion = () => {
    let newSuggestion;
    do {
      newSuggestion = getRandomUsername();
    } while (newSuggestion === suggestion);
    setSuggestion(newSuggestion);
    setUsername(newSuggestion);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/users', { username: newSuggestion, email , password })
    .then(result=> console.log("Username suggestion sent to server:", result))
    navigate('/login') // Redirect to login page after suggestion
    .catch(err => console.log(err));
    setError("");
    if (!username) {
      setError("Username is required.");
      return;
    }
    if (!email || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    try {
        const res = await axios.post("http://localhost:3000/users", {
        username,
        email,
        password,
        });
        console.log("Account created:", res.data);
        alert("Account created successfully!");
        navigate("/login"); // Redirect to login page
    } catch (err) {
        const msg = err.response?.data?.message || "Signup failed.";
        setError(msg);
        console.error("Signup error:", err.response?.data || err.message);
    }
    // Submit logic here (API call, etc.)
    alert("Account created!");
  };

  return (
    <div className="signup-bg-wrapper">
      {HEADER}
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit} autoComplete="off">
          <h2>Join / Sign In</h2>
          <label>
            Username
            <div className="username-row">
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Choose a username"
                autoComplete="off"
                required
              />
              <button
                type="button"
                className="suggest-btn"
                onClick={handleSuggestion}
                title="Suggest a random username"
              >
                Suggest
              </button>
            </div>
            <div className="suggestion-text">Try: <span onClick={handleSuggestion} className="suggestion-link">{suggestion}</span></div>
          </label>
          <label>
            Email ID
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              autoComplete="off"
              required
            />
          </label>
          <label>
            Password
            <div className="password-row">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Create a password (min 8 chars)"
                minLength={8}
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                className="show-btn"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </label>
          {error && <div className="error-msg">{error}</div>}
          <button className="signup-submit" type="submit">
            Create Account
          </button>
          <button
            className="signin-submit"
            type="button"
            onClick={() => navigate('/login')}
          >
            Already in! Sign In
          </button>
        </form>
      </div>
      <style>{`
        .signup-bg-wrapper {
          min-height: 100vh;
          width: 100vw;
          position: relative;
          background: url('https://images.unsplash.com/photo-1613150036274-b0d7751c1a5b?q=80&w=3173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') center center/cover no-repeat;
        }
        .signup-bg-wrapper:before {
          content: '';
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(20, 20, 20, 0.55);
          z-index: 0;
          pointer-events: none;
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
            line-height: 1;
            color: #ffffff;
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
        .signup-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 2;
        }
        .signup-form {
          background: rgba(255,255,255,0.97);
          padding: 2.5rem 2rem;
          border-radius: 1.2rem;
          box-shadow: 0 2px 24px rgba(0,0,0,0.13);
          min-width: 340px;
          max-width: 95vw;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }
        .signup-form h2 {
          margin-bottom: 1.2rem;
          font-family: 'Montserrat', sans-serif;
          font-size: 2rem;
          font-weight: 700;
          text-align: center;
        }
        .signup-form label {
          font-size: 1rem;
          font-weight: 500;
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }
        .username-row, .password-row {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }
        .signup-form input[type='text'],
        .signup-form input[type='email'],
        .signup-form input[type='password'] {
          padding: 0.8rem 1rem;
          border: 1.5px solid #ccc;
          border-radius: 0.5rem;
          font-size: 1rem;
          font-family: inherit;
          background: #fafafa;
          transition: border 0.2s;
          flex: 1;
        }
        .signup-form input:focus {
          border: 1.5px solid #bee5ea;
          outline: none;
        }
        .suggest-btn, .show-btn {
          background: #bee5ea;
          color: #222;
          border: none;
          border-radius: 0.5rem;
          padding: 0.5rem 1rem;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .suggest-btn:hover, .show-btn:hover {
          background: #a3d8e6;
        }
        .suggestion-text {
          font-size: 0.95rem;
          color: #888;
          margin-top: 0.2rem;
        }
        .suggestion-link {
          color: #bee5ea;
          cursor: pointer;
          text-decoration: underline;
        }
        .error-msg {
          color: #d33;
          background: #ffeaea;
          border-radius: 0.5rem;
          padding: 0.5rem 1rem;
          font-size: 1rem;
          margin-bottom: 0.5rem;
          text-align: center;
        }
        .signup-submit {
          margin-top: 0.5rem;
          background: #222;
          color: #fff;
          border: none;
          border-radius: 0.7rem;
          padding: 0.9rem 0;
          font-size: 1.1rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          cursor: pointer;
          transition: background 0.2s;
        }
        .signup-submit:hover {
          background: #bee5ea;
          color: #222;
        }
        .signin-submit {
          margin-top: 0.5rem;
          background: rgb(140, 138, 138);
          color: #fff;
          border: none;
          border-radius: 0.7rem;
          padding: 0.9rem 0;
          font-size: 1.1rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          cursor: pointer;
          transition: background 0.2s;
        }
        .signin-submit:hover {
          background: #bee5ea;
          color: #222;
        }
        @media (max-width: 700px) {
          .main-header {
            flex-direction: column;
            padding: 1.2rem 1vw;
          }
          .signup-form {
            min-width: 90vw;
            padding: 1.2rem 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}
