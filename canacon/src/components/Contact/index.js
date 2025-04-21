import React, { useState, useEffect, useRef } from "react";
import styles from "./Contact.module.css";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { FiTwitter, FiInstagram, FiFacebook } from "react-icons/fi";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: ""
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
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setFormStatus({
        submitted: true,
        error: false,
        message: "Thanks for your message! We'll be in touch soon."
      });
      
      // Form validation
      if (!formData.name || !formData.email || !formData.message) {
        setFormStatus({
          submitted: true,
          error: true,
          message: "Please fill in all fields."
        });
        return;
      }

      // In a real application, you would send this data to a server
      console.log("Form submitted:", formData);
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      
    } catch (error) {
      setFormStatus({
        submitted: true,
        error: true,
        message: "Something went wrong. Please try again later."
      });
    }
  };

  return (
    <section className={styles.contact} id="contact" ref={sectionRef}>
      <div className={styles.container}>
        <div
          className={`${styles.heading} ${isVisible.heading ? styles.visible : ""}`}
        >
          <h2>Contact Us</h2>
          <div className={styles.underline}></div>
          <p>Our team looks forward to hearing from you!</p>
        </div>

        <div className={styles.contactContent}>
          <div
            className={`${styles.contactInfo} ${isVisible.contactInfo ? styles.visible : ""}`}
          >
            <div className={styles.infoItem}>
              <div className={styles.socialLinks}>
                <a href="#" className={styles.socialIcon}>
                  <FiFacebook />
                </a>
                <a href="#" className={styles.socialIcon}>
                  <FiTwitter />
                </a>
                <a href="#" className={styles.socialIcon}>
                  <FiInstagram />
                </a>
                <a href="#" className={styles.socialIcon}>
                  <FaEnvelope />
                </a>
              </div>
            </div>
          </div>

          <div
            className={`${styles.contactForm} ${isVisible.contactForm ? styles.visible : ""}`}
          >
            {formStatus.submitted && !formStatus.error ? (
              <div className={styles.successMessage}>
                <h3>{formStatus.message}</h3>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Your Name</label>
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
                  <label htmlFor="email">Your Email</label>
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
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
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
                    <p>{formStatus.message}</p>
                  </div>
                )}
                
                <button type="submit" className={styles.submitButton}>Send Message</button>
              </form>
            )}
          </div>
        </div>
        
        <div className={styles.footer}>
          <p>© 2025 Canacon Media</p>
          <p>Design by Canacon</p>
        </div>
      </div>
    </section>
  );
};

export default Contact; 