import React, { useEffect, useState, useRef } from 'react';
import styles from './Services.module.css';

const Services = () => {
  const [isVisible, setIsVisible] = useState({
    heading: false,
    cards: false,
    cta: false
  });
  
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(prev => ({ ...prev, heading: true })), 100);
          setTimeout(() => setIsVisible(prev => ({ ...prev, cards: true })), 300);
          setTimeout(() => setIsVisible(prev => ({ ...prev, cta: true })), 700);
          
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

  const services = [
    {
      id: 1,
      title: 'Web Development',
      description: 'Custom web applications built with cutting-edge technologies. We craft seamless, responsive, and high-performance digital experiences that align with your business goals.',
      icon: '🔧'
    },
    {
      id: 2,
      title: 'SEO & Micro Data Optimization',
      description: 'Enhance your digital presence with strategic SEO and structured data implementations that improve visibility and drive targeted traffic to your platforms.',
      icon: '📊'
    },
    {
      id: 3,
      title: 'Frontend Architecture Consulting',
      description: 'Expert guidance on frontend architecture, component design, and technology stack decisions. We help teams build scalable, maintainable codebases.',
      icon: '🏗️'
    },
    {
      id: 4,
      title: 'UX/UI Audits',
      description: 'Comprehensive analysis of your user experience and interface design. We identify friction points and opportunities for improvement to enhance user engagement.',
      icon: '🔍'
    }
  ];

  return (
    <section className={styles.services} ref={sectionRef}>
      <div className={styles.container}>
        <div
          className={`${styles.heading} ${isVisible.heading ? styles.visible : ''}`}
        >
          <h2>Our Services</h2>
          <div className={styles.underline}></div>
          <p>We combine technical expertise with strategic thinking to deliver solutions that drive results.</p>
        </div>

        <div className={styles.serviceGrid}>
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`${styles.serviceCard} ${isVisible.cards ? styles.visible : ''}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className={styles.iconContainer}>
                <span className={styles.icon}>{service.icon}</span>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
        
        <div
          className={`${styles.callToAction} ${isVisible.cta ? styles.visible : ''}`}
        >
          <h3>Ready to transform your digital presence?</h3>
          <a href="#contact" className={styles.button}>Get Started</a>
        </div>
      </div>
    </section>
  );
};

export default Services; 