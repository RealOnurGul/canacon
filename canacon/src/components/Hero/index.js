import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import styles from './Hero.module.css';
import logoImage from '../../assets/images/canacon_square_logo.png';

const Hero = () => {
  const logoContainerRef = useRef(null);

  return (
    <section className={styles.hero}>
      {/* Logo container */}
      <div className={styles.logoContainer} ref={logoContainerRef}>
        <img src={logoImage} alt="Canacon Logo" className={styles.heroLogo} />
      </div>
      
      <div className={styles.contentWrapper}>
        <div className={styles.contentContainer}>
          <h1 className={styles.mainHeading}>
            <span className={styles.headingLine}>
              <span className={styles.headingText}>
                C<span style={{ color: 'var(--color-red)' }}>A</span>NACON MEDIA
              </span>
            </span>
          </h1>
          
          <div className={styles.descriptionContainer}>
            <p className={styles.description}>
              Your partner for digital growth. We provide customized strategies and solutions to help your business thrive in the digital landscape.
            </p>
          </div>
          
          <div className={styles.actionContainer}>
            <Link to="/contact" className={styles.primaryButton}>
              <span className={styles.buttonText}>Get Started</span>
              <FaArrowRight className={styles.buttonIcon} />
            </Link>
            <a href="#services" className={styles.secondaryButton}>
              Our Services
            </a>
          </div>
          
          <div className={styles.statsContainer}>
            <div className={styles.statItem}>
              <div className={styles.statValue}>
                <span className={styles.statValueInner}>150</span>
                <span className={styles.statSymbol}>+</span>
              </div>
              <div className={styles.statLabel}>Clients</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>
                <span className={styles.statValueInner}>300</span>
                <span className={styles.statSymbol}>+</span>
              </div>
              <div className={styles.statLabel}>Projects</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>
                <span className={styles.statValueInner}>98</span>
                <span className={styles.statSymbol}>%</span>
              </div>
              <div className={styles.statLabel}>Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 

