import React from "react";
import styles from "./Footer.module.css";
import { FiFacebook, FiTwitter, FiInstagram } from "react-icons/fi";
import { FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.copyright}>
          <p>2025 © Canacon Media</p>
          <p>Design by Canacon</p>
        </div>
        
        <div className={styles.social}>
          <a href="#" className={styles.socialIcon} aria-label="Facebook">
            <FiFacebook />
          </a>
          <a href="#" className={styles.socialIcon} aria-label="Twitter">
            <FiTwitter />
          </a>
          <a href="#" className={styles.socialIcon} aria-label="Instagram">
            <FiInstagram />
          </a>
          <a href="#" className={styles.socialIcon} aria-label="Email">
            <FaEnvelope />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 