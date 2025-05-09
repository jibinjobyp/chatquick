import React from 'react';
import { 
  FiGithub, 
  FiTwitter, 
  FiLinkedin, 
  FiInstagram,
  FiFacebook,
  FiYoutube,
  FiCode,
  FiLock,
  FiServer,
  FiMail
} from 'react-icons/fi';
import { FiTerminal } from 'react-icons/fi';

import './footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const [loadProgress, setLoadProgress] = React.useState(0);
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      setLoadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
    
    return () => clearInterval(interval);
  }, []);

  // Magnetic effect handler
  const handleMouseMove = (e) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    target.style.setProperty('--x', `${x}px`);
    target.style.setProperty('--y', `${y}px`);
  };

  return (
    <footer className="cyber-footer">
      <div className="footer-container">
        {/* Compact Footer Grid */}
        <div className="footer-grid">
          {/* Company Info */}
          <div className="footer-section">
            <h3 className="footer-heading">
              <FiTerminal className="footer-icon" />
              <span>CyberNex</span>
            </h3>
            <p className="footer-text">
              Next-gen cybersecurity solutions powered by AI.
            </p>
            <div className="system-status">
              <div className="status-indicator"></div>
              <span>SYSTEM: ONLINE</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-heading">
              <FiCode className="footer-icon" />
              <span>Links</span>
            </h3>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          {/* Security Links */}
          <div className="footer-section">
            <h3 className="footer-heading">
              <FiLock className="footer-icon" />
              <span>Legal</span>
            </h3>
            <ul className="footer-links">
              <li><a href="/privacy">Privacy</a></li>
              <li><a href="/terms">Terms</a></li>
              <li><a href="/security">Security</a></li>
            </ul>
          </div>

          {/* Social Media with Magnetic Effect */}
          <div className="footer-section">
            <h3 className="footer-heading">
              <FiServer className="footer-icon" />
              <span>Connect</span>
            </h3>
            <div className="social-links">
              <a 
                href="https://github.com" 
                className="magnetic-icon"
                onMouseMove={handleMouseMove}
                aria-label="GitHub"
              >
                <FiGithub />
                <span className="ripple"></span>
              </a>
              <a 
                href="https://twitter.com" 
                className="magnetic-icon"
                onMouseMove={handleMouseMove}
                aria-label="Twitter"
              >
                <FiTwitter />
                <span className="ripple"></span>
              </a>
              <a 
                href="https://linkedin.com" 
                className="magnetic-icon"
                onMouseMove={handleMouseMove}
                aria-label="LinkedIn"
              >
                <FiLinkedin />
                <span className="ripple"></span>
              </a>
              <a 
                href="https://instagram.com" 
                className="magnetic-icon"
                onMouseMove={handleMouseMove}
                aria-label="Instagram"
              >
                <FiInstagram />
                <span className="ripple"></span>
              </a>
              <a 
                href="https://facebook.com" 
                className="magnetic-icon"
                onMouseMove={handleMouseMove}
                aria-label="Facebook"
              >
                <FiFacebook />
                <span className="ripple"></span>
              </a>
              <a 
                href="https://youtube.com" 
                className="magnetic-icon"
                onMouseMove={handleMouseMove}
                aria-label="YouTube"
              >
                <FiYoutube />
                <span className="ripple"></span>
              </a>
            </div>
            <div className="contact-info">
              <p><FiMail className="contact-icon" /> support@cybernex.io</p>
            </div>
          </div>
        </div>

        {/* Compact Footer Bottom */}
        <div className="footer-bottom">
          <div className="progress-container">
            <div className="progress-text">INTEGRITY: {loadProgress}%</div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${loadProgress}%` }}
              ></div>
            </div>
          </div>
          
          <div className="copyright">
            &copy; {currentYear} CyberNex [v2.4.1]
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;