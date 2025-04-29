import React, { useState, useEffect, useRef } from 'react';
import { FaHome, FaChartLine } from 'react-icons/fa';
import { MdLocationCity, MdGroups, MdWeb, MdCampaign, MdAnalytics } from 'react-icons/md';
import styles from './RealEstate.module.css';

const RealEstate = () => {
  const [sectionsVisible, setSectionsVisible] = useState({
    hero: false,
    whyChoose: false,
    services: false,
    cta: false,
  });

  // Refs for each section
  const heroRef = useRef(null);
  const whyChooseRef = useRef(null);
  const servicesRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === heroRef.current) {
            setSectionsVisible(prev => ({ ...prev, hero: true }));
          } else if (entry.target === whyChooseRef.current) {
            setSectionsVisible(prev => ({ ...prev, whyChoose: true }));
          } else if (entry.target === servicesRef.current) {
            setSectionsVisible(prev => ({ ...prev, services: true }));
          } else if (entry.target === ctaRef.current) {
            setSectionsVisible(prev => ({ ...prev, cta: true }));
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Store current ref values to avoid issues in cleanup
    const heroElement = heroRef.current;
    const whyChooseElement = whyChooseRef.current;
    const servicesElement = servicesRef.current;
    const ctaElement = ctaRef.current;
    
    if (heroElement) observer.observe(heroElement);
    if (whyChooseElement) observer.observe(whyChooseElement);
    if (servicesElement) observer.observe(servicesElement);
    if (ctaElement) observer.observe(ctaElement);

    return () => {
      if (heroElement) observer.unobserve(heroElement);
      if (whyChooseElement) observer.unobserve(whyChooseElement);
      if (servicesElement) observer.unobserve(servicesElement);
      if (ctaElement) observer.unobserve(ctaElement);
    };
  }, []);

  return (
    <div className={styles.realEstate}>
      {/* Hero Section */}
      <section className={styles.heroSection} ref={heroRef}>
        <div className={styles.heroOverlay}></div>
        <div className={`${styles.heroContainer} ${sectionsVisible.hero ? styles.visible : ''}`}>
          <h1 className={styles.heroTitle}>Realtor Web Solutions</h1>
          <div className={styles.heroHighlight}>
            <span className={styles.dollarSymbol}>$</span>
            <span className={styles.numberHighlight}>300</span>
            <span className={styles.million}>MILLION+</span>
            <span className={styles.sold}>SOLD</span>
          </div>
          <p className={styles.heroSubtext}>In successful listings powered by our digital marketing & web development for real estate professionals</p>
          <a href="/contact" className={styles.heroButton}>Elevate Your Real Estate Business</a>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className={styles.whyChooseSection} ref={whyChooseRef}>
        <div className={styles.container}>
          <div className={`${styles.content} ${sectionsVisible.whyChoose ? styles.visible : ''}`}>
            <h2 className={styles.sectionTitle}>Why Realtors Choose Us</h2>
            <div className={styles.underline}></div>
            <p className={styles.sectionText}>We specialize in helping real estate professionals showcase properties, attract clients, and close more deals through strategic digital marketing and custom web solutions.</p>
            <div className={styles.bulletPoints}>
              <div className={styles.bulletPoint}>
                <MdWeb className={styles.checkIcon} />
                <span>Custom Property Websites that showcase listings beautifully</span>
              </div>
              <div className={styles.bulletPoint}>
                <MdCampaign className={styles.checkIcon} />
                <span>Targeted Digital Campaigns to reach qualified buyers</span>
              </div>
              <div className={styles.bulletPoint}>
                <MdAnalytics className={styles.checkIcon} />
                <span>Performance Analytics to track and optimize results</span>
              </div>
              <div className={styles.bulletPoint}>
                <MdGroups className={styles.checkIcon} />
                <span>Dedicated Support Team for all your marketing needs</span>
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
          <h2 className={styles.serviceTitle}>Digital Marketing for Realtors</h2>
          <div className={styles.underline}></div>
          <div className={`${styles.servicesGrid} ${sectionsVisible.services ? styles.visible : ''}`}>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                <FaHome />
              </div>
              <h3>Property Websites</h3>
              <p>Custom single-property websites that showcase your listings with beautiful imagery, virtual tours, and neighborhood information.</p>
            </div>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                <MdWeb />
              </div>
              <h3>Realtor Websites</h3>
              <p>Professional, branded websites that highlight your expertise, listings, and services to attract new clients and build your reputation.</p>
            </div>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                <MdCampaign />
              </div>
              <h3>Digital Advertising</h3>
              <p>Targeted ad campaigns on social media and search engines to reach potential buyers in your target demographic and area.</p>
            </div>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                <MdLocationCity />
              </div>
              <h3>Virtual Tours</h3>
              <p>Immersive 3D virtual tours that give potential buyers a realistic feel for properties from the comfort of their homes.</p>
            </div>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                <FaChartLine />
              </div>
              <h3>SEO & Content</h3>
              <p>Search engine optimization and content creation to boost your visibility and establish you as a local real estate authority.</p>
            </div>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                <MdAnalytics />
              </div>
              <h3>Marketing Analytics</h3>
              <p>Comprehensive reporting and analytics to track performance and continuously optimize your digital marketing efforts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection} ref={ctaRef}>
        <div className={`${styles.container} ${sectionsVisible.cta ? styles.visible : ''}`}>
          <h2 className={styles.ctaTitle}>Ready to Boost Your Real Estate Business?</h2>
          <p className={styles.ctaText}>Join the hundreds of successful realtors who trust us with their digital marketing. Contact us today to discuss how we can help you showcase properties and close more deals.</p>
          <a href="/contact" className={styles.ctaButton}>Schedule a Free Consultation</a>
        </div>
      </section>
    </div>
  );
};

export default RealEstate; 