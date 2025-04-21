import React, { useState } from 'react';
import styles from './Testimonials.module.css';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "CEO, Tech Innovate",
      image: "/images/testimonials/client1.jpg",
      quote: "Canacon Media completely transformed our digital presence. Their strategic approach to SEO and content marketing helped us increase organic traffic by 150% in just six months. Their team is responsive, creative, and genuinely cares about our success.",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Reynolds",
      position: "Marketing Director, GrowthHub",
      image: "/images/testimonials/client2.jpg",
      quote: "Working with Canacon has been a game-changer for our business. Their ability to understand our unique challenges and create customized digital strategies has resulted in a 200% increase in qualified leads. I highly recommend their services.",
      rating: 5
    },
    {
      id: 3,
      name: "Jennifer Chen",
      position: "Founder, StyleBox",
      image: "/images/testimonials/client3.jpg",
      quote: "The Canacon team redesigned our e-commerce website and implemented a comprehensive digital marketing strategy that increased our conversion rate by 80%. Their attention to detail and data-driven approach sets them apart from other agencies.",
      rating: 5
    }
  ];
  
  const handlePrev = () => {
    setActiveIndex(prev => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  
  const handleNext = () => {
    setActiveIndex(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };
  
  return (
    <section className={styles.testimonials} id="testimonials">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Client Testimonials</span>
          <h2 className={styles.sectionTitle}>What Our Clients Say</h2>
          <p className={styles.sectionDescription}>
            Don't just take our word for it – hear from some of our satisfied clients 
            about their experience working with our team.
          </p>
        </div>
        
        <div className={styles.testimonialSlider}>
          <div className={styles.slidesContainer} style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className={styles.testimonialSlide}>
                <div className={styles.testimonialContent}>
                  <div className={styles.quoteIcon}>
                    <svg width="42" height="36" viewBox="0 0 42 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.5 0L24.75 8.25H16.5C14.5109 8.25 12.6032 9.04018 11.1967 10.4467C9.79018 11.8532 9 13.7609 9 15.75V25.5C9 27.4891 9.79018 29.3968 11.1967 30.8033C12.6032 32.2098 14.5109 33 16.5 33H26.25C28.2391 33 30.1468 32.2098 31.5533 30.8033C32.9598 29.3968 33.75 27.4891 33.75 25.5V0H16.5ZM0 8.25V33.75H8.25C10.2391 33.75 12.1468 32.9598 13.5533 31.5533C14.9598 30.1468 15.75 28.2391 15.75 26.25V16.5C15.75 14.5109 14.9598 12.6032 13.5533 11.1967C12.1468 9.79018 10.2391 9 8.25 9H0V8.25Z" fill="currentColor"/>
                    </svg>
                  </div>
                  
                  <div className={styles.rating}>
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i} 
                        className={`${styles.star} ${i < testimonial.rating ? styles.activeStar : ''}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  
                  <p className={styles.quote}>{testimonial.quote}</p>
                  
                  <div className={styles.clientInfo}>
                    <div className={styles.clientImage}>
                      <img src={testimonial.image} alt={testimonial.name} />
                    </div>
                    <div className={styles.clientDetails}>
                      <h4 className={styles.clientName}>{testimonial.name}</h4>
                      <p className={styles.clientPosition}>{testimonial.position}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className={styles.sliderControls}>
            <button className={styles.sliderBtn} onClick={handlePrev} aria-label="Previous testimonial">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <div className={styles.sliderDots}>
              {testimonials.map((_, index) => (
                <button 
                  key={index}
                  className={`${styles.sliderDot} ${index === activeIndex ? styles.activeDot : ''}`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button className={styles.sliderBtn} onClick={handleNext} aria-label="Next testimonial">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 