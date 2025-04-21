import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Startups.module.css';

const Startups = () => {
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
    <section className={styles.startups} id="startups" ref={sectionRef}>
      <div className={styles.container}>
        <div className={`${styles.image} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.imageContainer}></div>
        </div>
        <div className={`${styles.content} ${isVisible ? styles.visible : ''}`}>
          <h2>Start-up optimized digital marketing services.</h2>
          <div className={styles.underline}></div>
          <p>We offer a free, no-obligation consultation for start-ups.</p>
          <Link 
            to="/contact" 
            className={styles.button}
          >
            CONTACT US
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Startups; 