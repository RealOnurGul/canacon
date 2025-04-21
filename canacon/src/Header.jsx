import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "./Header.module.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
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
          <ul className={classes.navLinks}>
            <li><a href="/#home" onClick={closeMenu}>Home</a></li>
            <li><a href="/#about" onClick={closeMenu}>About</a></li>
            <li><a href="/#services" onClick={closeMenu}>Services</a></li>
            <li><a href="/#portfolio" onClick={closeMenu}>Portfolio</a></li>
            <li><a href="/#contact" onClick={closeMenu}>Contact</a></li>
            <li><Link to="/blog" onClick={closeMenu}>Blog</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 