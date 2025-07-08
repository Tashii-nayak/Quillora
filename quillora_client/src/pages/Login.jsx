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
      <a href="/signup" className="join-link">JOIN/SIGN IN</a>
      <a href="#" className="lang-link">MY PROFILE</a>
    </nav>
  </header>
);

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError("");
    if (!username) {
      setError("Username is required.");
      return;
    }
    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    try {
      const result = await axios.post('http://localhost:3000/login', { username, password });
      if (result.data.message === "Login successful") {
        window.location.href = 'http://localhost:5173/index.html';
      } else {
        setError(result.data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("Login failed. Please check your credentials and try again.");
      console.log(err);
    }
  };

  return (
    <div className="login-bg-wrapper">
      {HEADER}
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
          <h2>Sign In</h2>
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Enter your username"
              autoComplete="username"
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
                placeholder="Enter your password"
                minLength={8}
                autoComplete="current-password"
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
          <button className="login-submit" type="submit">
            Sign In
          </button>
          <div className="login-link-row">
            <span>Don't have an account?</span>
            <button
              type="button"
              className="signup-link-btn"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
      <style>{`
        .login-bg-wrapper {
          min-height: 100vh;
          width: 100vw;
          position: relative;
          background: url('https://images.unsplash.com/photo-1613150036274-b0d7751c1a5b?q=80&w=3173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') center center/cover no-repeat;
        }
        .login-bg-wrapper:before {
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
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 2;
        }
        .login-form {
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
        .login-form h2 {
          margin-bottom: 1.2rem;
          font-family: 'Montserrat', sans-serif;
          font-size: 2rem;
          font-weight: 700;
          text-align: center;
        }
        .login-form label {
          font-size: 1rem;
          font-weight: 500;
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }
        .password-row {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }
        .login-form input[type='text'],
        .login-form input[type='password'] {
          padding: 0.8rem 1rem;
          border: 1.5px solid #ccc;
          border-radius: 0.5rem;
          font-size: 1rem;
          font-family: inherit;
          background: #fafafa;
          transition: border 0.2s;
          flex: 1;
        }
        .login-form input:focus {
          border: 1.5px solid #bee5ea;
          outline: none;
        }
        .show-btn {
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
        .show-btn:hover {
          background: #a3d8e6;
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
        .login-submit {
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
        .login-submit:hover {
          background: #bee5ea;
          color: #222;
        }
        .login-link-row {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.7rem;
          margin-top: 1rem;
          font-size: 1rem;
        }
        .signup-link-btn {
          background: none;
          border: none;
          color: #bee5ea;
          font-weight: 700;
          cursor: pointer;
          text-decoration: underline;
          font-size: 1rem;
          padding: 0;
        }
        .signup-link-btn:hover {
          color: #222;
        }
        @media (max-width: 700px) {
          .main-header {
            flex-direction: column;
            padding: 1.2rem 1vw;
          }
          .login-form {
            min-width: 90vw;
            padding: 1.2rem 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}