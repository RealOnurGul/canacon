import React, { useState, useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsActive(!isActive);
    // Prevent scrolling when menu is open
    if (!isActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check for page refresh
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isActive && e.target.closest(`.${styles.nav}`) === null && 
          e.target.closest(`.${styles.hamburger}`) === null) {
        setIsActive(false);
        document.body.style.overflow = "";
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isActive]);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <RouterLink
          to="/"
          className={styles.logo}
        >
          <span className={styles.logoText}>CANACON <span className={styles.logoAccent}>MEDIA</span></span>
        </RouterLink>
        
        <div 
          className={`${styles.hamburger} ${isActive ? styles.active : ""}`} 
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        
        <nav className={`${styles.nav} ${isActive ? styles.active : ""}`}>
          <ul className={styles.navList}>
            <li>
              <RouterLink 
                to="/" 
                className={`${styles.navLink} ${location.pathname === '/' ? styles.active : ''}`}
                onClick={() => setIsActive(false)}
              >
                Home
                <span className={styles.linkHighlight}></span>
              </RouterLink>
            </li>
            <li>
              <RouterLink 
                to="/realestate" 
                className={`${styles.navLink} ${location.pathname === '/realestate' ? styles.active : ''}`}
                onClick={() => setIsActive(false)}
              >
                Real Estate
                <span className={styles.linkHighlight}></span>
              </RouterLink>
            </li>
            <li>
              <RouterLink 
                to="/startups" 
                className={`${styles.navLink} ${location.pathname === '/startups' ? styles.active : ''}`}
                onClick={() => setIsActive(false)}
              >
                Start-ups
                <span className={styles.linkHighlight}></span>
              </RouterLink>
            </li>
            <li>
              <RouterLink 
                to="/blog" 
                className={`${styles.navLink} ${location.pathname === '/blog' ? styles.active : ''}`}
                onClick={() => setIsActive(false)}
              >
                Blog
                <span className={styles.linkHighlight}></span>
              </RouterLink>
            </li>
            <li className={styles.navAction}>
              <RouterLink 
                to="/contact" 
                className={styles.contactButton}
                onClick={() => setIsActive(false)}
              >
                Contact
              </RouterLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 