import React, { useEffect, useState } from 'react';
import styles from './Services.module.css';

// Fixed array of services to avoid recreating on each render
const servicesList = [
  {
    id: 'seo',
    name: 'SEO',
    description: "Improve your website's visibility in search engines and drive organic traffic with our tailored SEO strategies.",
    image: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'web-development',
    name: 'Web Development',
    description: 'Transform your online presence with custom-built websites that are fast, responsive, and user-friendly.',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'digital-advertising',
    name: 'Digital Advertising',
    description: 'Reach your target audience with precision through strategic digital ad campaigns across multiple platforms.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'social-media',
    name: 'Social Media Marketing',
    description: 'Build a strong social media presence that engages your audience and builds brand loyalty.',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'email-marketing',
    name: 'Email Marketing',
    description: 'Connect directly with your audience through targeted email campaigns that convert.',
    image: 'https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'growth-strategy',
    name: 'Growth Strategy',
    description: 'Develop a comprehensive roadmap for sustainable business growth with actionable plans.',
    image: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?q=80&w=600&auto=format&fit=crop'
  }
];

const Services = () => {
  // Use an intersection observer to load images only when they come into view
  const [visibleServices, setVisibleServices] = useState([]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleServices(prev => [...prev, entry.target.dataset.serviceId]);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '100px', threshold: 0.1 }
    );
    
    const serviceCards = document.querySelectorAll(`.${styles.serviceCard}`);
    serviceCards.forEach(card => observer.observe(card));
    
    return () => {
      serviceCards.forEach(card => observer.unobserve(card));
    };
  }, []);
  
  return (
    <section id="services" className={styles.servicesSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>OUR SERVICES</span>
          <h2 className={styles.sectionTitle}>What We Offer</h2>
          <p className={styles.sectionDescription}>
            Comprehensive digital marketing solutions to help your business thrive online.
          </p>
        </div>

        <div className={styles.servicesGrid}>
          {servicesList.map((service) => (
            <div 
              key={service.id} 
              className={styles.serviceCard}
              data-service-id={service.id}
            >
              <div className={styles.serviceImageContainer}>
                {visibleServices.includes(service.id) && (
                  <img 
                    src={service.image} 
                    alt={service.name} 
                    className={styles.serviceImage}
                    loading="lazy"
                    width="600"
                    height="400"
                  />
                )}
              </div>
              <h3 className={styles.serviceName}>{service.name}</h3>
              <p className={styles.serviceDescription}>{service.description}</p>
              <a href={`#${service.id}`} className={styles.serviceLink}>
                Learn More
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services; 