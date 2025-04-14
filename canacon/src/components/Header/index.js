import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import styles from './Header.module.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to="home" smooth={true} duration={800}>
            Canacon X
          </Link>
        </div>

        <div className={styles.hamburger} onClick={toggleMenu}>
          <span className={isMenuOpen ? styles.active : ''}></span>
          <span className={isMenuOpen ? styles.active : ''}></span>
          <span className={isMenuOpen ? styles.active : ''}></span>
        </div>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.active : ''}`}>
          <Link 
            to="home" 
            smooth={true} 
            duration={800} 
            spy={true}
            activeClass={styles.active}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="about" 
            smooth={true} 
            duration={800} 
            spy={true}
            activeClass={styles.active}
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link 
            to="services" 
            smooth={true} 
            duration={800} 
            spy={true}
            activeClass={styles.active}
            onClick={() => setIsMenuOpen(false)}
          >
            Services
          </Link>
          <Link 
            to="portfolio" 
            smooth={true} 
            duration={800} 
            spy={true}
            activeClass={styles.active}
            onClick={() => setIsMenuOpen(false)}
          >
            Portfolio
          </Link>
          <Link 
            to="contact" 
            smooth={true} 
            duration={800} 
            spy={true}
            activeClass={styles.active}
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header; 