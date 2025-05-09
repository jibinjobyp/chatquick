import React, { useState, useEffect } from 'react';
import { 
  FiMenu, 
  FiX, 
  FiLogOut, 
  FiHome, 
  FiBriefcase,
  FiShield,
  FiTerminal 
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [terminalText, setTerminalText] = useState('');

  // Check login status when the component is mounted
  useEffect(() => {
    const token = localStorage.getItem('token'); // Check if token exists
    if (token) {
      setIsLoggedIn(true); // Set user as logged in
    }
  }, []); // Only runs on initial mount

  // Handle login (simulate login for example purposes)
  const handleLogin = () => {
    localStorage.setItem('token', 'yourToken'); // Simulate token storage
    setIsLoggedIn(true); // Immediately update the state
  };

  // Generate random ASCII art for logo
  const generateTerminalText = () => {
    const texts = [
      '> ACCESS_GRANTED',
      '> SYSTEM_ONLINE',
      '> HACK_THE_PLANET',
      '> INIT_SESSION',
      '> SECURE_CONNECTION'
    ];
    return texts[Math.floor(Math.random() * texts.length)];
  };

  // Terminal typing effect
  useEffect(() => {
    if (terminalText === '') {
      const text = generateTerminalText();
      let i = 0;
      const interval = setInterval(() => {
        if (i <= text.length) {
          setTerminalText(text.substring(0, i));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [terminalText]);

  // Reset terminal text periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setTerminalText('');
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Random glitch effect trigger
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchEffect(true);
      setTimeout(() => setGlitchEffect(false), 200);
    }, 5000);
    return () => clearInterval(glitchInterval);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // Add glitch effect when menu is toggled
    setGlitchEffect(true);
    setTimeout(() => setGlitchEffect(false), 300);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setIsLoggedIn(false); // Update state to reflect logout
  };

  return (
    <nav className={`navbar ${glitchEffect ? 'glitch-effect' : ''}`}>
      <div className="navbar-container">
        {/* Logo/Brand */}
        <Link to="/" className="navbar-brand">
          <FiTerminal className="brand-icon" />
          <span className="brand-text">CyberNex</span>
          <span className="terminal-text">{terminalText}</span>
        </Link>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-button" onClick={toggleMenu}>
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Main Navigation */}
        <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
          <ul>
            <li>
              <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>
                <FiHome className="nav-icon" />
                <span>Home</span>
                <span className="nav-glow"></span>
              </Link>
            </li>
            <li>
              <Link to="/users" className="nav-link" onClick={() => setIsOpen(false)}>
                <FiShield className="nav-icon" />
                <span>People</span>
                <span className="nav-glow"></span>
              </Link>
            </li>
            <li>
              <Link to="/profile" className="nav-link" onClick={() => setIsOpen(false)}>
                <FiBriefcase className="nav-icon" />
                <span>Profile</span>
                <span className="nav-glow"></span>
              </Link>
            </li>
          </ul>

          {/* Auth Buttons */}
          <div className="auth-buttons">
            {isLoggedIn ? (
              <Link
                className="logout-button"
                onClick={handleLogout}
              >
                <FiLogOut className="menu-icon" />
                <span className='auth-text'>Logout</span>
              </Link>
            ) : (
              <>
                <Link to="/login" className="login-button" onClick={handleLogin}>
                  <span className="auth-text">Login</span>
                </Link>
                <Link to="/signup" className="signup-button">
                  <span className="auth-text">Signup</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
