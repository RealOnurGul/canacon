import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "./Header.module.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [realEstateOpen, setRealEstateOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // Reset RE submenu when main menu is toggled
    if (!isOpen) {
      setRealEstateOpen(false);
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    setRealEstateOpen(false);
  };

  const toggleRealEstate = (e) => {
    e.preventDefault();
    setRealEstateOpen(!realEstateOpen);
  };

  const headerClasses = `${classes.header} ${scrolled ? classes.scrolled : ""}`;
  const navClasses = `${classes.nav} ${isOpen ? classes.open : ""}`;

  return (
    <header className={headerClasses}>
      <div className={classes.container}>
        <div className={classes.logo}>
          <Link to="/" onClick={closeMenu}>
            CANACON
          </Link>
        </div>

        <div className={classes.menuButton} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <nav className={navClasses}>
          <div className={classes.mobileNavContainer}>
            <div className={classes.navRow}>
              <ul className={classes.navLinks}>
                <li><a href="/#home" onClick={closeMenu}>Home</a></li>
                <li><a href="/#about" onClick={closeMenu}>About</a></li>
                <li><a href="/#services" onClick={closeMenu}>Services</a></li>
                <li><a href="/#portfolio" onClick={closeMenu}>Portfolio</a></li>
              </ul>
            </div>
            
            <div className={classes.navRow}>
              <ul className={classes.navLinks}>
                <li><Link to="/blog" onClick={closeMenu}>Blog</Link></li>
                <li className={classes.hasSubmenu}>
                  <a href="#" className={classes.submenuToggle} onClick={toggleRealEstate}>
                    Real Estate 
                    <span className={`${classes.dropdownArrow} ${realEstateOpen ? classes.open : ''}`}>▼</span>
                  </a>
                  <ul className={`${classes.submenu} ${realEstateOpen ? classes.open : ''}`}>
                    <li><Link to="/realestate" onClick={closeMenu}>Real Estate Home</Link></li>
                    <li><Link to="/commission-calculator" onClick={closeMenu}>Commission Calculator</Link></li>
                  </ul>
                </li>
                <li><a href="/#contact" onClick={closeMenu}>Contact</a></li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header; 