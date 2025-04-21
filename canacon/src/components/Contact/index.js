import React, { useState, useEffect, useRef } from "react";
import styles from "./Contact.module.css";
import { FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { FiTwitter, FiInstagram, FiFacebook, FiLinkedin } from "react-icons/fi";

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
      // Form validation
      if (!formData.name || !formData.email || !formData.message) {
        setFormStatus({
          submitted: true,
          error: true,
          message: "Please fill in all required fields."
        });
        return;
      }

      // Send form data to Formspree
      const response = await fetch("https://formspree.io/f/your-formspree-id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setFormStatus({
          submitted: true,
          error: false,
          message: "Thanks for your message! We'll be in touch soon."
        });
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
      } else {
        throw new Error("Form submission failed");
      }
      
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
      <div className={styles.backgroundDecoration}></div>
      <div className={styles.container}>
        <div
          className={`${styles.heading} ${isVisible.heading ? styles.visible : ""}`}
        >
          <span className={styles.sectionLabel}>Get in Touch</span>
          <h2 className={styles.title}>Contact Us</h2>
          <div className={styles.underline}></div>
          <p className={styles.subtitle}>Have a question or want to work with us? We'd love to hear from you.</p>
        </div>

        <div className={styles.contactContent}>
          <div
            className={`${styles.contactInfo} ${isVisible.contactInfo ? styles.visible : ""}`}
          >
            <div className={styles.infoCards}>
              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>
                  <FaPhone />
                </div>
                <h3 className={styles.infoTitle}>Phone</h3>
                <p className={styles.infoText}>
                  <a href="tel:+1234567890">(123) 456-7890</a>
                </p>
                <p className={styles.infoText}>Mon-Fri, 9am-5pm</p>
              </div>
              
              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>
                  <FaMapMarkerAlt />
                </div>
                <h3 className={styles.infoTitle}>Office</h3>
                <p className={styles.infoText}>
                  123 Web Agency Street<br />
                  San Francisco, CA 94107
                </p>
              </div>
              
              <div className={styles.socialContainer}>
                <h3 className={styles.socialTitle}>Connect With Us</h3>
                <div className={styles.socialLinks}>
                  <a href="#" className={styles.socialIcon} aria-label="Facebook">
                    <FiFacebook />
                  </a>
                  <a href="#" className={styles.socialIcon} aria-label="Twitter">
                    <FiTwitter />
                  </a>
                  <a href="#" className={styles.socialIcon} aria-label="Instagram">
                    <FiInstagram />
                  </a>
                  <a href="#" className={styles.socialIcon} aria-label="LinkedIn">
                    <FiLinkedin />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`${styles.contactForm} ${isVisible.contactForm ? styles.visible : ""}`}
          >
            <div className={styles.formCard}>
              <h3 className={styles.formTitle}>Send us a message</h3>
              
              {formStatus.submitted && !formStatus.error ? (
                <div className={styles.successMessage}>
                  <div className={styles.successIcon}>✓</div>
                  <h3>{formStatus.message}</h3>
                  <p>We appreciate you contacting us and will respond shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.formContent}>
                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label htmlFor="name">Your Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label htmlFor="email">Your Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="subject">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your message here..."
                      required
                    ></textarea>
                  </div>
                  
                  {formStatus.error && (
                    <div className={styles.errorMessage}>
                      <p>{formStatus.message}</p>
                    </div>
                  )}
                  
                  <button type="submit" className={styles.submitButton}>
                    Send Message
                    <span className={styles.buttonIcon}>→</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 