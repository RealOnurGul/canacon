import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './RealEstate.module.css';

const RealEstate = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    // Store current ref value to avoid issues in cleanup
    const currentRef = sectionRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section className={styles.realEstate} id="realestate" ref={sectionRef}>
      <div className={styles.container}>
        <div className={`${styles.content} ${isVisible ? styles.visible : ''}`}>
          <h2>Digital Solutions for Realtors</h2>
          <div className={styles.underline}></div>
          <div className={styles.achievement}>
            <div className={styles.moneyLine}>
              <span className={styles.dollarSign}>$</span>
              <span className={styles.number}>300M+</span>
              <span className={styles.inText}>in listings</span>
              <span className={styles.soldText}>SOLD</span>
            </div>
          </div>
          <div className={styles.features}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🏠</div>
              <p>Custom property websites that convert</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🎯</div>
              <p>Targeted digital marketing campaigns</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>📊</div>
              <p>Marketing analytics that drive results</p>
            </div>
          </div>
          <Link to="/realestate" className={styles.button}>
            BOOST YOUR LISTINGS
          </Link>
        </div>
        <div className={`${styles.image} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.imageContainer}></div>
        </div>
      </div>
    </section>
  );
};

export default RealEstate; 