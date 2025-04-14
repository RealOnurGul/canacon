import React, { useEffect, useState, useRef } from 'react';
import styles from './About.module.css';

const About = () => {
  const [isVisible, setIsVisible] = useState({
    heading: false,
    text: false,
    image: false,
    values: false
  });
  
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add slight delays to create a sequential animation effect
          setTimeout(() => setIsVisible(prev => ({ ...prev, heading: true })), 100);
          setTimeout(() => setIsVisible(prev => ({ ...prev, text: true })), 300);
          setTimeout(() => setIsVisible(prev => ({ ...prev, image: true })), 500);
          setTimeout(() => setIsVisible(prev => ({ ...prev, values: true })), 700);
          
          // Unobserve once elements are visible
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
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
    <section className={styles.about} ref={sectionRef}>
      <div className={styles.container}>
        <div className={`${styles.heading} ${isVisible.heading ? styles.visible : ''}`}>
          <h2>About Canacon X</h2>
          <div className={styles.underline}></div>
        </div>
        
        <div className={styles.content}>
          <div className={`${styles.text} ${isVisible.text ? styles.visible : ''}`}>
            <h3>Who We Are</h3>
            <p>
              Canacon X is a modern consulting firm specializing in high-end web development and 
              micro data insights. We bridge the gap between advanced technology and practical 
              business applications, delivering solutions that are both innovative and effective.
            </p>
            <p>
              Founded by a team of industry experts, we combine deep technical knowledge with 
              strategic thinking to transform digital experiences and drive measurable results.
            </p>
          </div>
          
          <div className={`${styles.imageContainer} ${isVisible.image ? styles.visible : ''}`}>
            <div className={styles.image}></div>
          </div>
        </div>
        
        <div className={`${styles.values} ${isVisible.values ? styles.visible : ''}`}>
          <div className={styles.valueItem}>
            <h4>Innovation</h4>
            <p>We pursue cutting-edge solutions that push boundaries and create new possibilities.</p>
          </div>
          
          <div className={styles.valueItem}>
            <h4>Precision</h4>
            <p>We believe in meticulous attention to detail and data-driven decision making.</p>
          </div>
          
          <div className={styles.valueItem}>
            <h4>Partnership</h4>
            <p>We form deep collaborations with our clients, becoming an extension of their team.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 