import React, { useState, useEffect, useRef } from 'react';
import styles from './Contact.module.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false
  });

  const [isVisible, setIsVisible] = useState({
    heading: false,
    contactInfo: false,
    contactForm: false
  });
  
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(prev => ({ ...prev, heading: true })), 100);
          setTimeout(() => setIsVisible(prev => ({ ...prev, contactInfo: true })), 300);
          setTimeout(() => setIsVisible(prev => ({ ...prev, contactForm: true })), 500);
          
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        submitted: true,
        error: true
      });
      return;
    }

    // In a real application, you would send this data to a server
    console.log('Form submitted:', formData);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      message: ''
    });
    
    // Show success message
    setFormStatus({
      submitted: true,
      error: false
    });
    
    // Reset status after 3 seconds
    setTimeout(() => {
      setFormStatus({
        submitted: false,
        error: false
      });
    }, 3000);
  };

  return (
    <section className={styles.contact} itemScope itemType="https://schema.org/Organization" ref={sectionRef}>
      <div className={styles.container}>
        <div
          className={`${styles.heading} ${isVisible.heading ? styles.visible : ''}`}
        >
          <h2>Contact Us</h2>
          <div className={styles.underline}></div>
          <p>Ready to start your next project? Reach out to our team today.</p>
        </div>

        <div className={styles.contactContent}>
          <div
            className={`${styles.contactInfo} ${isVisible.contactInfo ? styles.visible : ''}`}
          >
            <div className={styles.infoItem}>
              <h3>Get in Touch</h3>
              <p>
                We're always looking for new challenges and opportunities to create exceptional digital experiences.
              </p>
              <p>
                Whether you have a specific project in mind or just want to explore possibilities, we'd love to hear from you.
              </p>
            </div>
            
            <div className={styles.infoItem}>
              <h4>Our Office</h4>
              <address itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                <p itemProp="streetAddress">123 Innovation Way</p>
                <p>
                  <span itemProp="addressLocality">San Francisco</span>, 
                  <span itemProp="addressRegion">CA</span> 
                  <span itemProp="postalCode">94103</span>
                </p>
              </address>
            </div>
            
            <div className={styles.infoItem}>
              <h4>Contact Details</h4>
              <p>Email: <a href="mailto:info@canaconx.com" itemProp="email">info@canaconx.com</a></p>
              <p>Phone: <a href="tel:+14155552671" itemProp="telephone">(415) 555-2671</a></p>
            </div>
          </div>

          <div
            className={`${styles.contactForm} ${isVisible.contactForm ? styles.visible : ''}`}
          >
            {formStatus.submitted && !formStatus.error ? (
              <div className={styles.successMessage}>
                <h3>Thank you for your message!</h3>
                <p>We'll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                
                {formStatus.error && (
                  <div className={styles.errorMessage}>
                    <p>Please fill in all fields.</p>
                  </div>
                )}
                
                <button type="submit" className={styles.submitButton}>Send Message</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 