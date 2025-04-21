import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-scroll';
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
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
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
            to="contact" 
            spy={true} 
            smooth={true} 
            offset={-70} 
            duration={500} 
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