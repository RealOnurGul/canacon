import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import { Link } from "react-scroll";

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
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

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <a href="/">CANACON</a>
        </div>
        
        <div 
          className={`${styles.hamburger} ${isActive ? styles.active : ""}`} 
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        
        <nav className={`${styles.nav} ${isActive ? styles.active : ""}`}>
          <Link 
            to="home" 
            spy={true} 
            smooth={true} 
            offset={-70} 
            duration={500} 
            className={styles.navLink}
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link 
            to="about" 
            spy={true} 
            smooth={true} 
            offset={-70} 
            duration={500} 
            className={styles.navLink}
            onClick={toggleMenu}
          >
            About
          </Link>
          <Link 
            to="services" 
            spy={true} 
            smooth={true} 
            offset={-70} 
            duration={500} 
            className={styles.navLink}
            onClick={toggleMenu}
          >
            Services
          </Link>
          <Link 
            to="portfolio" 
            spy={true} 
            smooth={true} 
            offset={-70} 
            duration={500} 
            className={styles.navLink}
            onClick={toggleMenu}
          >
            Portfolio
          </Link>
          <Link 
            to="blog" 
            spy={true} 
            smooth={true} 
            offset={-70} 
            duration={500} 
            className={styles.navLink}
            onClick={toggleMenu}
          >
            Blog
          </Link>
          <Link 
            to="contact" 
            spy={true} 
            smooth={true} 
            offset={-70} 
            duration={500} 
            className={`${styles.navLink} ${styles.contactLink}`}
            onClick={toggleMenu}
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header; 