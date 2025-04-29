import React, { useState, useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import logoImage from "../../assets/images/canacon_logo2.png";

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

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/#services' },
    { 
      name: 'Real Estate', 
      path: '/realestate',
      dropdown: [
        { name: 'Commission Calculator', path: '/commission-calculator' }
      ]
    },
    { name: 'Startups', path: '/#startups' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.headerContent}>
        <div className={styles.logoContainer}>
          <RouterLink
            to="/"
            className={styles.logo}
          >
            <img src={logoImage} alt="Canacon Media" className={styles.logoImage} />
          </RouterLink>
        </div>
        
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
          <div className={styles.navItems}>
            <ul className={styles.navList}>
              {links.map((link, index) => (
                <li key={index} className={link.dropdown ? styles.dropdown : ''}>
                  <RouterLink 
                    to={link.path} 
                    className={`${styles.navLink} ${
                      (link.path === '/' && location.pathname === '/') || 
                      (link.path !== '/' && location.pathname.includes(link.path.replace('/#', ''))) 
                        ? styles.active 
                        : ''
                    } ${link.dropdown ? styles.hasDropdown : ''}`}
                    onClick={() => setIsActive(false)}
                  >
                    {link.name}
                    <span className={styles.linkHighlight}></span>
                  </RouterLink>
                  
                  {link.dropdown && (
                    <div className={styles.dropdownMenu}>
                      {link.dropdown.map((dropItem, dropIndex) => (
                        <RouterLink 
                          key={dropIndex}
                          to={dropItem.path} 
                          className={styles.dropdownItem}
                          onClick={() => setIsActive(false)}
                        >
                          {dropItem.name}
                        </RouterLink>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
          
          <RouterLink 
            to="/contact" 
            className={styles.contactButton}
            onClick={() => setIsActive(false)}
          >
            Contact
          </RouterLink>
        </nav>
      </div>
    </header>
  );
};

export default Header; 