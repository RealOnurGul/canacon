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
    hero: false,
    heading: false,
    contactInfo: false,
    contactForm: false
  });
  
  const heroRef = useRef(null);
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === heroRef.current) {
            setIsVisible(prev => ({ ...prev, hero: true }));
          } else if (entry.target === sectionRef.current) {
            setTimeout(() => setIsVisible(prev => ({ ...prev, heading: true })), 100);
            setTimeout(() => setIsVisible(prev => ({ ...prev, contactInfo: true })), 300);
            setTimeout(() => setIsVisible(prev => ({ ...prev, contactForm: true })), 500);
          }
          
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    const currentHeroRef = heroRef.current;
    const currentSectionRef = sectionRef.current;
    
    if (currentHeroRef) observer.observe(currentHeroRef);
    if (currentSectionRef) observer.observe(currentSectionRef);
    
    return () => {
      if (currentHeroRef) observer.unobserve(currentHeroRef);
      if (currentSectionRef) observer.unobserve(currentSectionRef);
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
      const response = await fetch("https://formspree.io/f/xdoqoayw", {
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
    <div className={styles.contactPage}>
      {/* Hero Section */}
      <section className={styles.heroSection} ref={heroRef}>
        <div className={styles.heroOverlay}></div>
        <div className={`${styles.heroContent} ${isVisible.hero ? styles.visible : ""}`}>
          <h1 className={styles.heroTitle}>Get In Touch</h1>
          <p className={styles.heroSubtitle}>We'd love to hear from you. Let's start a conversation.</p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className={styles.contactSection} ref={sectionRef}>
        <div className={styles.container}>
          <div
            className={`${styles.heading} ${isVisible.heading ? styles.visible : ""}`}
          >
            <span className={styles.sectionLabel}>Contact Us</span>
            <h2 className={styles.title}>How Can We Help?</h2>
            <div className={styles.underline}></div>
            <p className={styles.subtitle}>Whether you have a question about our services, pricing, or anything else, our team is ready to answer all your questions.</p>
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
                    <a href="tel:+16045622408">(604) 562-2408</a>
                  </p>
                </div>
                
                <div className={styles.infoCard}>
                  <div className={styles.infoIcon}>
                    <FaMapMarkerAlt />
                  </div>
                  <h3 className={styles.infoTitle}>Office</h3>
                  <p className={styles.infoText}>
                    We're located in Montreal, QC
                  </p>
                </div>
                
                <div className={styles.socialContainer}>
                  <h3 className={styles.socialTitle}>Connect With Us</h3>
                  <div className={styles.socialLinks}>
                    <a href="https://facebook.com" className={styles.socialIcon} aria-label="Facebook">
                      <FiFacebook />
                    </a>
                    <a href="https://twitter.com" className={styles.socialIcon} aria-label="Twitter">
                      <FiTwitter />
                    </a>
                    <a href="https://instagram.com" className={styles.socialIcon} aria-label="Instagram">
                      <FiInstagram />
                    </a>
                    <a href="https://linkedin.com" className={styles.socialIcon} aria-label="LinkedIn">
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

      {/* FAQ Section */}
      <section className={styles.faqSection}>
        <div className={styles.container}>
          <div className={styles.faqHeading}>
            <h2 className={styles.title}>Frequently Asked Questions</h2>
            <div className={styles.underline}></div>
          </div>
          
          <div className={styles.faqGrid}>
            <div className={styles.faqItem}>
              <h3 className={styles.faqQuestion}>What services do you offer?</h3>
              <p className={styles.faqAnswer}>We offer a comprehensive range of services including web development, digital marketing, SEO optimization, brand strategy, and custom solutions for real estate professionals and startups.</p>
            </div>
            
            <div className={styles.faqItem}>
              <h3 className={styles.faqQuestion}>How long does it take to complete a project?</h3>
              <p className={styles.faqAnswer}>Project timelines vary depending on scope and complexity. Typically, small projects take 2-4 weeks, while larger projects may take 2-3 months. We'll provide you with a detailed timeline during our initial consultation.</p>
            </div>
            
            <div className={styles.faqItem}>
              <h3 className={styles.faqQuestion}>Do you offer ongoing support after project completion?</h3>
              <p className={styles.faqAnswer}>Yes, we offer various support packages to ensure your project continues to run smoothly after launch. Our team is always available to help with updates, maintenance, and troubleshooting.</p>
            </div>
            
            <div className={styles.faqItem}>
              <h3 className={styles.faqQuestion}>How do we get started working together?</h3>
              <p className={styles.faqAnswer}>Getting started is easy! Simply fill out our contact form, and one of our team members will reach out to schedule a consultation. During this initial meeting, we'll discuss your goals and how we can help you achieve them.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact; 