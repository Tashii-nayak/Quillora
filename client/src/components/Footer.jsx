import { NavLink } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer-main">
      <div className="footer-main-content">
        <div className="footer-logo">Quillora</div>
        <div className="footer-links">
          <NavLink to="/about">About</NavLink>
          <NavLink to="/explore">Explore</NavLink>
          <NavLink to="/read">Read</NavLink>
          <NavLink to="/write">Write</NavLink>
          <NavLink to="/chatrooms">Chatrooms</NavLink>
          <NavLink to="/">Contact</NavLink>
        </div>
        <div className="footer-copy">&copy; 2025 Quillora. All rights reserved.</div>
      </div>
    </footer>
  );
}
