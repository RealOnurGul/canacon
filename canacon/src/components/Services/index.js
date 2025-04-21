import React, { useState, useEffect, useRef } from 'react';
import styles from './Services.module.css';

const Services = () => {
  const [isVisible, setIsVisible] = useState({
    heading: false,
    cards: false,
    cta: false
  });
  
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Stagger the animations but with reduced delays
          setTimeout(() => setIsVisible(prev => ({ ...prev, heading: true })), 0);
          setTimeout(() => setIsVisible(prev => ({ ...prev, cards: true })), 100);
          setTimeout(() => setIsVisible(prev => ({ ...prev, cta: true })), 200);
          
          observer.unobserve(entry.target);
        }
      });
    };
    
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px"
    });
    
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

  const services = [
    {
      id: 1,
      title: 'SEO',
      description: 'Increase your webpage ranking with link building, domain authority optimization, sitemaps, on-page optimization, blog writing, and more.',
      icon: '🔍'
    },
    {
      id: 2,
      title: 'Web Development',
      description: 'We create world-class websites — from static pages to fully fledged e-commerce platforms, we deliver websites that elevate your business.',
      icon: '💻'
    },
    {
      id: 3,
      title: 'Digital Advertising',
      description: 'We offer comprehensive pay-per-click (PPC) management and advertising on all major digital platforms. We ensure your business reaches the right consumer.',
      icon: '📱'
    },
    {
      id: 4,
      title: 'Social Media Marketing',
      description: 'The bread and butter of today\'s digital world. We help grow your brand on social media and convert leads into customers. Our team stays on top of the latest trends to keep you ahead of the competition.',
      icon: '📣'
    },
    {
      id: 5,
      title: 'Email Marketing',
      description: 'Our advanced and creative email marketing strategies help you build relationships with customers, boost brand exposure, and drive sales. We analyze your industry and target audience to craft the right content.',
      icon: '📧'
    },
    {
      id: 6,
      title: 'Growth Strategy',
      description: 'We analyze and act on your data. Canacon Media understands your ideal audience and focuses on maximizing your ROI. Our services make your brand stand out, and growing your digital footprint is one of our core strengths.',
      icon: '📈'
    }
  ];

  return (
    <section className={styles.services} ref={sectionRef} id="services">
      <div className={styles.container}>
        <div
          className={`${styles.heading} ${isVisible.heading ? styles.visible : ''}`}
        >
          <h2>What We Do</h2>
          <div className={styles.underline}></div>
          <p>We offer all digital media essentials. We aim to meet every client's needs — if you have a specific service in mind, let us know and we'll find the right solution for you.</p>
        </div>

        <div className={styles.serviceGrid}>
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`${styles.serviceCard} ${isVisible.cards ? styles.visible : ''}`}
              style={{ transitionDelay: `${index * 0.05}s` }}
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
          <h3>Ready to grow your business and increase your sales?</h3>
          <p>Digital marketing is now vital to running a successful and profitable business. We take the time to understand your products and services and then execute a custom digital content strategy tailored to your business goals.</p>
          <div className={styles.ctaButtons}>
            <a href="/contact" className={styles.button}>CONTACT US</a>
            <a href="#about" className={styles.buttonAlt}>LEARN MORE</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services; 