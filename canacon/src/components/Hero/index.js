import React, { useEffect, useState } from 'react';
import { Link } from 'react-scroll';
import styles from './Hero.module.css';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animations on component mount
    setIsVisible(true);
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={styles.container}>
        <div 
          className={`${styles.content} ${isVisible ? styles.visible : ''}`}
        >
          <h1 className={styles.title}>
            Canacon X
          </h1>
          
          <p className={styles.tagline}>
            Redefining digital consulting
          </p>

          <div className={styles.ctaContainer}>
            <Link 
              to="contact" 
              smooth={true} 
              duration={800} 
              className={styles.cta}
            >
              Get in touch
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.scrollIndicator}>
        <Link to="about" smooth={true} duration={800}>
          <div className={styles.mouse}>
            <div className={styles.wheel}></div>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Hero; 