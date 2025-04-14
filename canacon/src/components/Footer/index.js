import React from 'react';
import { Link } from 'react-scroll';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerInfo}>
            <div className={styles.logo}>Canacon X</div>
            <p className={styles.tagline}>Redefining digital consulting</p>
            <p className={styles.description}>
              We combine technical expertise with strategic thinking to deliver digital solutions that drive business results.
            </p>
          </div>
          
          <div className={styles.footerNav}>
            <h3>Quick Links</h3>
            <nav>
              <Link to="home" smooth={true} duration={800}>Home</Link>
              <Link to="about" smooth={true} duration={800}>About</Link>
              <Link to="services" smooth={true} duration={800}>Services</Link>
              <Link to="portfolio" smooth={true} duration={800}>Portfolio</Link>
              <Link to="contact" smooth={true} duration={800}>Contact</Link>
            </nav>
          </div>
          
          <div className={styles.footerServices}>
            <h3>Services</h3>
            <ul>
              <li>Web Development</li>
              <li>SEO & Microdata Optimization</li>
              <li>Frontend Architecture</li>
              <li>UX/UI Audits</li>
            </ul>
          </div>
          
          <div className={styles.footerContact}>
            <h3>Contact</h3>
            <address>
              <p>123 Innovation Way</p>
              <p>San Francisco, CA 94103</p>
            </address>
            <p>Email: <a href="mailto:info@canaconx.com">info@canaconx.com</a></p>
            <p>Phone: <a href="tel:+14155552671">(415) 555-2671</a></p>
            
            <div className={styles.social}>
              <a href="#" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="#" aria-label="Twitter">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
              <a href="#" aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" aria-label="GitHub">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className={styles.copyright}>
          <p>&copy; {currentYear} Canacon X. All Rights Reserved.</p>
          <div className={styles.legal}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 