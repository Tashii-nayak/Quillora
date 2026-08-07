import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'HOME', extraClass: '' },
  { to: '/about', label: 'ABOUT', extraClass: '' },
  { to: '/explore', label: 'EXPLORE', extraClass: '' },
  { to: '/read', label: 'READ', extraClass: '' },
  { to: '/write', label: 'WRITE', extraClass: '' },
  { to: '/chatrooms', label: 'CHATROOMS', extraClass: '' },
  { to: '/signup', label: 'JOIN/SIGN IN', extraClass: 'contact-link' },
  { to: '/profile', label: 'MY PROFILE', extraClass: 'lang-link' },
];

export default function Header() {
  return (
    <header className="main-header">
      <div className="logo">
        Quillora
        <span className="logo-subtext">Love Bibliophile</span>
      </div>
      <nav className="main-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) => {
              const classes = [];
              if (isActive) classes.push('active');
              if (item.extraClass) classes.push(item.extraClass);
              return classes.join(' ');
            }}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
