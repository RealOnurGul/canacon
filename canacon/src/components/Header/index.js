import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
        <Link
          to="home"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          className={styles.logo}
        >
          <span className={styles.logoText}>CANACON MEDIA</span>
        </Link>
        
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
              <Link 
                to="home" 
                spy={true} 
                smooth={true} 
                offset={-70} 
                duration={500} 
                activeClass={styles.active}
                onClick={() => setIsActive(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="realestate" 
                spy={true} 
                smooth={true} 
                offset={-70} 
                duration={500} 
                activeClass={styles.active}
                onClick={() => setIsActive(false)}
              >
                Real Estate
              </Link>
            </li>
            <li>
              <Link 
                to="startups" 
                spy={true} 
                smooth={true} 
                offset={-70} 
                duration={500} 
                activeClass={styles.active}
                onClick={() => setIsActive(false)}
              >
                Start-ups
              </Link>
            </li>
            <li>
              <RouterLink 
                to="/blog" 
                className={styles.navLink}
                onClick={() => setIsActive(false)}
              >
                Blog
              </RouterLink>
            </li>
            <li className={styles.navAction}>
              <Link 
                to="contact" 
                spy={true} 
                smooth={true} 
                offset={-70} 
                duration={500} 
                className={styles.contactButton}
                onClick={() => setIsActive(false)}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 