import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Dumbbell, Menu, X } from 'lucide-react';

const navLinks = [
  { path: '/', label: 'Dashboard' },
  { path: '/plans', label: 'Membership Plans' },
  { path: '/register', label: 'Register Member' },
  { path: '/members', label: 'Members' },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="navbar">
      <div className="navbar-inner container">
        <NavLink to="/" className="logo" onClick={closeMenu}>
          <span className="logo-icon">
            <Dumbbell size={20} />
          </span>
          FIT<span className="logo-accent">FLEX</span>
        </NavLink>

        <button
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          {navLinks.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              onClick={closeMenu}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
