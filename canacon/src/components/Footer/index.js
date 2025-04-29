import React from "react";
import styles from "./Footer.module.css";
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.copyright}>
          <p>2025 © Canacon Media</p>
          <p>Design by Canacon</p>
        </div>
        
        <div className={styles.social}>
          <a href="https://facebook.com" className={styles.socialIcon} aria-label="Facebook">
            <FiFacebook />
          </a>
          <a href="https://twitter.com" className={styles.socialIcon} aria-label="Twitter">
            <FiTwitter />
          </a>
          <a href="https://instagram.com" className={styles.socialIcon} aria-label="Instagram">
            <FiInstagram />
          </a>
          <a href="https://linkedin.com" className={styles.socialIcon} aria-label="LinkedIn">
            <FiLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 