import React, { useState, useEffect, useRef } from 'react';
import styles from './CommissionCalculator.module.css';

const CommissionCalculator = () => {
  const [isVisible, setIsVisible] = useState({
    hero: false,
    calculator: false,
    faq: false
  });
  
  const heroRef = useRef(null);
  const calculatorRef = useRef(null);
  const faqRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === heroRef.current) {
            setIsVisible(prev => ({ ...prev, hero: true }));
          } else if (entry.target === calculatorRef.current) {
            setIsVisible(prev => ({ ...prev, calculator: true }));
          } else if (entry.target === faqRef.current) {
            setIsVisible(prev => ({ ...prev, faq: true }));
          }
          
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    const currentHeroRef = heroRef.current;
    const currentCalculatorRef = calculatorRef.current;
    const currentFaqRef = faqRef.current;
    
    if (currentHeroRef) observer.observe(currentHeroRef);
    if (currentCalculatorRef) observer.observe(currentCalculatorRef);
    if (currentFaqRef) observer.observe(currentFaqRef);
    
    return () => {
      if (currentHeroRef) observer.unobserve(currentHeroRef);
      if (currentCalculatorRef) observer.unobserve(currentCalculatorRef);
      if (currentFaqRef) observer.unobserve(currentFaqRef);
    };
  }, []);

  return (
    <div className={styles.calculatorPage}>
      {/* Hero Section */}
      <section className={styles.heroSection} ref={heroRef}>
        <div className={styles.heroOverlay}></div>
        <div className={`${styles.heroContent} ${isVisible.hero ? styles.visible : ""}`}>
          <h1 className={styles.heroTitle}>Real Estate Commission Calculator</h1>
          <p className={styles.heroSubtitle}>Quickly estimate your real estate commission earnings with our simple calculator.</p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className={styles.calculatorSection} ref={calculatorRef}>
        <div className={styles.container}>
          <div className={`${styles.calculatorContent} ${isVisible.calculator ? styles.visible : ""}`}>
            <div className={styles.calculatorCard}>
              <h2 className={styles.calculatorTitle}>Commission Calculator</h2>
              
              <div className={styles.calculatorForm}>
                <div className={styles.formGroup}>
                  <label htmlFor="propertyValue">Property Value ($)</label>
                  <input 
                    type="number" 
                    id="propertyValue" 
                    placeholder="e.g. 500000" 
                    min="0"
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="commissionRate">Commission Rate (%)</label>
                  <input 
                    type="number" 
                    id="commissionRate" 
                    placeholder="e.g. 2.5" 
                    min="0" 
                    step="0.1"
                  />
                </div>
                
                <button className={styles.calculateButton}>
                  Calculate Commission
                </button>
                
                <div className={styles.resultCard}>
                  <h3 className={styles.resultTitle}>Estimated Commission</h3>
                  <p className={styles.resultAmount}>$0.00</p>
                  <p className={styles.resultNote}>Enter values above to calculate your commission</p>
                </div>
              </div>
              
              <div className={styles.calculatorNote}>
                <p>Note: This calculator provides an estimate only. Actual commission rates and splits may vary. Consult with your broker for specific details.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.faqSection} ref={faqRef}>
        <div className={styles.container}>
          <div className={`${styles.faqContent} ${isVisible.faq ? styles.visible : ""}`}>
            <h2 className={styles.faqTitle}>Common Questions About Real Estate Commissions</h2>
            
            <div className={styles.faqGrid}>
              <div className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>How are real estate commissions typically calculated?</h3>
                <p className={styles.faqAnswer}>Real estate commissions are typically calculated as a percentage of the property's final sale price. The standard commission ranges from 5% to 6% of the sale price, although this can vary by location and agreement.</p>
              </div>
              
              <div className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>Who pays the real estate commission?</h3>
                <p className={styles.faqAnswer}>In most cases, the seller pays the real estate commission. This commission is typically split between the listing agent (seller's agent) and the buyer's agent. The commission is usually paid at closing from the proceeds of the sale.</p>
              </div>
              
              <div className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>Are real estate commissions negotiable?</h3>
                <p className={styles.faqAnswer}>Yes, real estate commissions are negotiable. There is no standard rate set by law. Agents and sellers can negotiate the commission rate based on various factors, including property value, market conditions, and the level of service provided.</p>
              </div>
              
              <div className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>How do commission splits work between agents and brokers?</h3>
                <p className={styles.faqAnswer}>When a commission is earned, it's typically paid to the brokers, not directly to the agents. The brokers then split the commission with their agents according to their agreement. This split varies widely, from 50/50 to 70/30 or higher in favor of the agent, depending on the brokerage model and the agent's experience.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CommissionCalculator; 