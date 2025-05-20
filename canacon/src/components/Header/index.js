import React, { useState, useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import logoImage from "../../assets/images/canacon_logo2.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [realEstateOpen, setRealEstateOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    const newMenuState = !menuOpen;
    setMenuOpen(newMenuState);
    
    // Prevent scrolling when menu is open
    if (newMenuState) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      // Reset submenu when main menu is closed
      setRealEstateOpen(false);
    }
  };

  const toggleRealEstate = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setRealEstateOpen(!realEstateOpen);
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
      if (menuOpen && e.target.closest(`.${styles.nav}`) === null && 
          e.target.closest(`.${styles.hamburger}`) === null) {
        setMenuOpen(false);
        document.body.style.overflow = "";
        setRealEstateOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = "";
    setRealEstateOpen(false);
  };

  // Desktop navigation links
  const links = [
    { name: 'Home', path: '/' },
    { 
      name: 'Real Estate', 
      path: '/realestate',
      dropdown: [
        { name: 'Commission Calculator', path: '/commission-calculator' }
      ]
    },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.headerContent}>
        <div className={styles.logoContainer}>
          <RouterLink
            to="/"
            className={styles.logo}
            onClick={closeMenu}
          >
            <img src={logoImage} alt="Canacon Media" className={styles.logoImage} />
          </RouterLink>
        </div>
        
        {/* Hamburger Menu Button */}
        <div 
          className={`${styles.hamburger} ${menuOpen ? styles.active : ""}`} 
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        
        {/* Desktop Navigation */}
        <div className={styles.desktopNav}>
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
                      >
                        {dropItem.name}
                      </RouterLink>
                    ))}
                  </div>
                )}
              </li>
            ))}
            <li>
              <RouterLink to="/contact" className={styles.navLink}>
                Contact
                <span className={styles.linkHighlight}></span>
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Mobile Menu - Styled and Enhanced */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenuContent}>
            <nav className={styles.mobileNav}>
              <ul className={styles.mobileNavList}>
                <li className={styles.mobileNavItem}>
                  <RouterLink to="/" className={styles.mobileNavLink} onClick={closeMenu}>
                    Home
                  </RouterLink>
                </li>
                
                <li className={styles.mobileNavItem}>
                  <RouterLink to="/blog" className={styles.mobileNavLink} onClick={closeMenu}>
                    Blog
                  </RouterLink>
                </li>
                
                <li className={`${styles.mobileNavItem} ${styles.hasSubmenu}`}>
                  <div className={styles.mobileNavDropdownHeader} onClick={toggleRealEstate}>
                    <RouterLink to="/realestate" className={styles.mobileNavLink} onClick={(e) => e.stopPropagation()}>
                      Real Estate
                    </RouterLink>
                    <span className={`${styles.dropdownArrow} ${realEstateOpen ? styles.open : ''}`}>
                      <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </div>
                  
                  <div className={`${styles.mobileSubMenu} ${realEstateOpen ? styles.open : ''}`}>
                    <RouterLink 
                      to="/commission-calculator" 
                      className={styles.mobileSubLink}
                      onClick={closeMenu}
                    >
                      Commission Calculator
                    </RouterLink>
                  </div>
                </li>
                
                <li className={styles.mobileNavItem}>
                  <RouterLink to="/contact" className={styles.mobileNavLink} onClick={closeMenu}>
                    Contact
                  </RouterLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 