import React, { useState, useEffect, useRef } from 'react';
import { FaBuilding, FaMapMarkerAlt, FaUserTie, FaHome, FaHandshake, FaChartLine } from 'react-icons/fa';
import { MdSecurity, MdLocationCity, MdGroups } from 'react-icons/md';
import styles from './RealEstate.module.css';

const RealEstate = () => {
  const [sectionsVisible, setSectionsVisible] = useState({
    whyChoose: false,
    services: false,
    highlight: false,
    cta: false,
  });

  // Refs for each section
  const whyChooseRef = useRef(null);
  const servicesRef = useRef(null);
  const highlightRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === whyChooseRef.current) {
            setSectionsVisible(prev => ({ ...prev, whyChoose: true }));
          } else if (entry.target === servicesRef.current) {
            setSectionsVisible(prev => ({ ...prev, services: true }));
          } else if (entry.target === highlightRef.current) {
            setSectionsVisible(prev => ({ ...prev, highlight: true }));
          } else if (entry.target === ctaRef.current) {
            setSectionsVisible(prev => ({ ...prev, cta: true }));
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    const whyChooseElement = whyChooseRef.current;
    const servicesElement = servicesRef.current;
    const highlightElement = highlightRef.current;
    const ctaElement = ctaRef.current;
    
    if (whyChooseElement) observer.observe(whyChooseElement);
    if (servicesElement) observer.observe(servicesElement);
    if (highlightElement) observer.observe(highlightElement);
    if (ctaElement) observer.observe(ctaElement);

    return () => {
      if (whyChooseElement) observer.unobserve(whyChooseElement);
      if (servicesElement) observer.unobserve(servicesElement);
      if (highlightElement) observer.unobserve(highlightElement);
      if (ctaElement) observer.unobserve(ctaElement);
    };
  }, []);

  return (
    <div className={styles.realEstate}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>Real Estate Excellence</h1>
          <p className={styles.heroSubtext}>We've helped clients buy and sell over $300M in real estate properties, creating value and exceeding expectations.</p>
          <a href="/contact" className={styles.heroButton}>Get Started</a>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className={styles.whyChooseSection} ref={whyChooseRef}>
        <div className={styles.container}>
          <div className={`${styles.content} ${sectionsVisible.whyChoose ? styles.visible : ''}`}>
            <h2 className={styles.sectionTitle}>Why Choose Us</h2>
            <div className={styles.underline}></div>
            <p className={styles.sectionText}>We combine industry expertise, deep market knowledge, and personalized service to deliver exceptional results for our clients.</p>
            <div className={styles.bulletPoints}>
              <div className={styles.bulletPoint}>
                <FaChartLine className={styles.checkIcon} />
                <span>Market Analysis Experts with comprehensive expertise</span>
              </div>
              <div className={styles.bulletPoint}>
                <FaHandshake className={styles.checkIcon} />
                <span>Personalized Service tailored to your unique needs</span>
              </div>
              <div className={styles.bulletPoint}>
                <MdGroups className={styles.checkIcon} />
                <span>Dedicated Team of professionals working for you</span>
              </div>
              <div className={styles.bulletPoint}>
                <MdSecurity className={styles.checkIcon} />
                <span>Transaction Security with professional oversight</span>
              </div>
            </div>
          </div>
          <div className={`${styles.image} ${sectionsVisible.whyChoose ? styles.visible : ''}`}>
            <div className={styles.whyChooseImage}></div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={styles.servicesSection} ref={servicesRef}>
        <div className={styles.container}>
          <h2 className={styles.serviceTitle}>Our Real Estate Services</h2>
          <div className={styles.underline}></div>
          <div className={`${styles.servicesGrid} ${sectionsVisible.services ? styles.visible : ''}`}>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                <FaHome />
              </div>
              <h3>Residential Sales</h3>
              <p>Expert guidance for selling your home at the best possible price with strategic marketing and negotiation.</p>
            </div>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                <FaUserTie />
              </div>
              <h3>Buyer Representation</h3>
              <p>Finding your dream home with personalized property searches and strong negotiation strategies.</p>
            </div>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                <FaBuilding />
              </div>
              <h3>Investment Properties</h3>
              <p>Identifying lucrative investment opportunities with thorough market analysis and financial projections.</p>
            </div>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                <MdLocationCity />
              </div>
              <h3>Commercial Real Estate</h3>
              <p>Comprehensive commercial property services for businesses looking to lease, buy, or sell space.</p>
            </div>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                <FaMapMarkerAlt />
              </div>
              <h3>Property Management</h3>
              <p>Full-service management solutions for property owners, handling everything from tenant screening to maintenance.</p>
            </div>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                <FaHandshake />
              </div>
              <h3>Real Estate Consulting</h3>
              <p>Strategic advice and insights on market trends, property valuation, and investment decision-making.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Highlight Section */}
      <section className={styles.highlightSection} ref={highlightRef}>
        <div className={`${styles.container} ${sectionsVisible.highlight ? styles.visible : ''}`}>
          <div className={styles.highlightContent}>
            <h2 className={styles.highlightTitle}>$300M+ in Real Estate Success</h2>
            <div className={styles.highlightUnderline}></div>
            <p className={styles.highlightText}>Our team has facilitated over $300 million in successful real estate transactions. We understand local market dynamics and leverage our expertise to maximize value for our clients.</p>
            <div className={styles.caseStudy}>
              <span className={styles.caseStudyBadge}>SUCCESS STORY</span>
              <p className={styles.caseStudyText}>"Canacon helped us sell our property for 15% above asking price in just 11 days. Their market knowledge and negotiation skills exceeded our expectations."</p>
            </div>
          </div>
          <div className={styles.image}>
            <div className={styles.soldSigns}></div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection} ref={ctaRef}>
        <div className={`${styles.container} ${sectionsVisible.cta ? styles.visible : ''}`}>
          <h2 className={styles.ctaTitle}>Ready to Make Your Move?</h2>
          <p className={styles.ctaText}>Whether you're buying, selling, or investing, our team is ready to help you achieve your real estate goals. Contact us today to schedule a consultation.</p>
          <a href="/contact" className={styles.ctaButton}>Contact Us Now</a>
        </div>
      </section>
    </div>
  );
};

export default RealEstate; 