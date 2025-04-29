import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './CommissionCalculator.module.css';
import logo from '../assets/images/canacon_square_logo.png';

const CommissionCalculator = () => {
  // Visibility state for animation
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [isCalculatorVisible, setIsCalculatorVisible] = useState(false);
  const [isFaqVisible, setIsFaqVisible] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    offerPrice: '',
    firstCommission: '7',
    remainderCommission: '2.5',
    firstCoopSplit: '3.22',
    remainderCoopSplit: '1.15',
    firstCommissionTouched: false,
    remainderCommissionTouched: false,
    firstCoopSplitTouched: false,
    remainderCoopSplitTouched: false,
    rawOfferPrice: ''
  });
  
  // Results state
  const [results, setResults] = useState({
    grossCommission: 0,
    coopBrokerage: 0,
    listingBrokerage: 0,
    gst: 0,
    sellerNet: 0
  });
  
  // Refs for intersection observer
  const heroRef = useRef(null);
  const calculatorRef = useRef(null);
  const faqRef = useRef(null);
  const modalRef = useRef(null);
  
  // Format currency with dollar sign
  const formatCurrency = (value) => {
    if (!value && value !== 0) return '';
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };
  
  // Format number with commas while typing
  const formatNumberWithCommas = (value) => {
    // Handle empty input
    if (!value) return '';
    
    // Remove any non-digit characters except decimal point
    const cleanValue = value.replace(/[^\d.]/g, '');
    
    // Split on decimal
    const parts = cleanValue.split('.');
    
    // Format the integer part with commas
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
    // Limit decimal to 2 places maximum
    if (parts[1] && parts[1].length > 2) {
      parts[1] = parts[1].substring(0, 2);
    }
    
    // Join with decimal if we have decimal part
    return parts.length > 1 ? parts.join('.') : parts[0];
  };
  
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    let updatedFormData = {...formData};
    
    if (name === 'offerPrice') {
      // Store the raw value (without commas) for calculations
      const rawValue = value.replace(/[^\d.]/g, '');
      
      // Format the display value with commas
      const formattedValue = formatNumberWithCommas(value);
      
      // Store both raw value for calculations and formatted for display
      updatedFormData = {
        ...formData,
        [name]: formattedValue,
        rawOfferPrice: rawValue
      };
    } else {
      // For other fields, process normally
      updatedFormData = {
        ...formData,
        [name]: value
      };
      
      // Set touched state for percentage fields
      if (name === 'firstCommission') {
        updatedFormData.firstCommissionTouched = true;
      } else if (name === 'remainderCommission') {
        updatedFormData.remainderCommissionTouched = true;
      } else if (name === 'firstCoopSplit') {
        updatedFormData.firstCoopSplitTouched = true;
      } else if (name === 'remainderCoopSplit') {
        updatedFormData.remainderCoopSplitTouched = true;
      }
    }
    
    setFormData(updatedFormData);
    
    // Auto-calculate when any input changes
    setTimeout(() => calculateCommission(updatedFormData), 0);
  };
  
  // Calculate commission based on inputs
  const calculateCommission = (data = formData) => {
    // Use the raw value (without commas) for offerPrice if available
    const offerPrice = parseFloat(data.rawOfferPrice || data.offerPrice.replace(/,/g, '')) || 0;
    
    // Use default values if fields are empty (not touched)
    const firstCommission = parseFloat(
      data.firstCommissionTouched ? data.firstCommission : '7'
    ) / 100 || 0;
    
    const remainderCommission = parseFloat(
      data.remainderCommissionTouched ? data.remainderCommission : '2.5'
    ) / 100 || 0;
    
    const firstCoopSplit = parseFloat(
      data.firstCoopSplitTouched ? data.firstCoopSplit : '3.22'
    ) / 100 || 0;
    
    const remainderCoopSplit = parseFloat(
      data.remainderCoopSplitTouched ? data.remainderCoopSplit : '1.15'
    ) / 100 || 0;
    
    // BC calculation logic
    const threshold = 100000; // $100,000 threshold
    
    // Calculate gross commission
    let grossCommission = 0;
    if (offerPrice <= threshold) {
      grossCommission = offerPrice * firstCommission;
    } else {
      grossCommission = (threshold * firstCommission) + ((offerPrice - threshold) * remainderCommission);
    }
    
    // Calculate co-operating brokerage (buyer's realtor)
    let coopBrokerage = 0;
    if (offerPrice <= threshold) {
      coopBrokerage = offerPrice * firstCoopSplit;
    } else {
      coopBrokerage = (threshold * firstCoopSplit) + ((offerPrice - threshold) * remainderCoopSplit);
    }
    
    // Calculate listing brokerage (seller's realtor)
    const listingBrokerage = grossCommission - coopBrokerage;
    
    // Calculate GST (5% of gross commission)
    const gst = grossCommission * 0.05;
    
    // Calculate seller's net
    const sellerNet = offerPrice - grossCommission - gst;
    
    setResults({
      grossCommission,
      coopBrokerage,
      listingBrokerage,
      gst,
      sellerNet
    });
  };
  
  // Reset calculator
  const handleReset = () => {
    setFormData({
      offerPrice: '',
      firstCommission: '7',
      remainderCommission: '2.5',
      firstCoopSplit: '3.22',
      remainderCoopSplit: '1.15',
      firstCommissionTouched: false,
      remainderCommissionTouched: false,
      firstCoopSplitTouched: false,
      remainderCoopSplitTouched: false,
      rawOfferPrice: ''
    });
    
    setResults({
      grossCommission: 0,
      coopBrokerage: 0,
      listingBrokerage: 0,
      gst: 0,
      sellerNet: 0
    });
  };

  // Toggle help modal - defined first
  const toggleHelpModal = useCallback((isOpen) => {
    setIsHelpModalOpen(isOpen);
    
    // Prevent body scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, []);

  // Close modal when clicking outside - using useCallback to memoize the function
  const handleClickOutside = useCallback((event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      toggleHelpModal(false);
    }
  }, [toggleHelpModal]); // toggleHelpModal as dependency instead of modalRef
  
  // Setup intersection observer for animation triggers
  useEffect(() => {
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHeroVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    
    const calculatorObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsCalculatorVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    const faqObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsFaqVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    // Store current ref values to avoid issues in cleanup
    const heroElement = heroRef.current;
    const calculatorElement = calculatorRef.current;
    const faqElement = faqRef.current;
    
    if (heroElement) {
      heroObserver.observe(heroElement);
    }
    
    if (calculatorElement) {
      calculatorObserver.observe(calculatorElement);
    }
    
    if (faqElement) {
      faqObserver.observe(faqElement);
    }

    // Add event listener for modal close
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      if (heroElement) {
        heroObserver.disconnect();
      }
      
      if (calculatorElement) {
        calculatorObserver.disconnect();
      }
      
      if (faqElement) {
        faqObserver.disconnect();
      }

      // Remove event listener
      document.removeEventListener('mousedown', handleClickOutside);
      
      // Ensure body scrolling is restored when component unmounts
      document.body.style.overflow = 'auto';
    };
  }, [handleClickOutside]);  // Add handleClickOutside as a dependency
  
  return (
    <div className={styles.calculatorPage}>
      {/* Help Modal */}
      {isHelpModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.helpModal} ref={modalRef}>
            <button 
              className={styles.closeModalButton}
              onClick={() => toggleHelpModal(false)}
            >
              ×
            </button>
            <h2 className={styles.helpTitle}>
              <span role="img" aria-label="brain">🧠</span> How to Use the Commission Calculator
            </h2>
            <p className={styles.helpSubtitle}>
              This calculator helps you determine the full commission breakdown for a BC real estate transaction — showing what the buyer's realtor and seller's realtor each receive, how much GST is added, and what the seller actually nets after all deductions.
            </p>

            <h3 className={styles.helpSectionTitle}>
              <span role="img" aria-label="numbers">🔢</span> Step-by-Step Guide:
            </h3>
            <ol className={styles.helpSteps}>
              <li>
                <strong>Enter the Offer Price</strong>
                <p>This is the full agreed sale price of the home (e.g., $828,888).</p>
              </li>
              <li>
                <strong>Fill in the Total Commission Split</strong>
                <p>These two boxes represent what the total commission is:</p>
                <ul>
                  <li>First box: the % charged on the first $100,000 of the offer price (e.g., 7%)</li>
                  <li>Second box: the % charged on the remainder of the price (e.g., 2.5%)</li>
                </ul>
              </li>
              <li>
                <strong>Fill in the Co-operating Split (Buyer's Agent Share)</strong>
                <p>These two boxes specify how much of the total commission is paid to the buyer's agent:</p>
                <ul>
                  <li>First box: the % of the first $100,000 going to the buyer's agent (e.g., 3.22%)</li>
                  <li>Second box: the % of the remainder going to the buyer's agent (e.g., 1.15%)</li>
                </ul>
                <p className={styles.helpNote}>
                  <span role="img" aria-label="check">✅</span> The seller's agent (listing agent) receives the remaining portion of the commission after the buyer's agent share is subtracted.
                </p>
              </li>
            </ol>

            <h3 className={styles.helpSectionTitle}>
              <span role="img" aria-label="receipt">🧾</span> Output Breakdown:
            </h3>
            <div className={styles.helpTable}>
              <div className={styles.helpTableRow}>
                <div className={styles.helpTableHeader}>Section</div>
                <div className={styles.helpTableHeader}>Description</div>
              </div>
              <div className={styles.helpTableRow}>
                <div className={styles.helpTableCell}><strong>Gross Commission</strong></div>
                <div className={styles.helpTableCell}>Total commission charged based on the 7% + 2.5% rule</div>
              </div>
              <div className={styles.helpTableRow}>
                <div className={styles.helpTableCell}><strong>Buyer's Agent (Co-operating Brokerage)</strong></div>
                <div className={styles.helpTableCell}>What the buyer's realtor earns based on the 3.22% + 1.15% split</div>
              </div>
              <div className={styles.helpTableRow}>
                <div className={styles.helpTableCell}><strong>Seller's Agent (Listing Brokerage)</strong></div>
                <div className={styles.helpTableCell}>What the seller's realtor earns — the remainder of the commission</div>
              </div>
              <div className={styles.helpTableRow}>
                <div className={styles.helpTableCell}><strong>GST (5%)</strong></div>
                <div className={styles.helpTableCell}>Sales tax on the full commission</div>
              </div>
              <div className={styles.helpTableRow}>
                <div className={styles.helpTableCell}><strong>Seller's Net</strong></div>
                <div className={styles.helpTableCell}>What the seller takes home after paying commission and GST</div>
              </div>
            </div>

            <h3 className={styles.helpSectionTitle}>
              <span role="img" aria-label="light bulb">💡</span> Real Example:
            </h3>
            <div className={styles.helpExample}>
              <div className={styles.helpExampleSection}>
                <h4>If you enter:</h4>
                <ul>
                  <li>Offer Price: $828,888</li>
                  <li>Total Commission Split: 7% / 2.5%</li>
                  <li>Buyer's Agent Split: 3.22% / 1.15%</li>
                </ul>
              </div>
              <div className={styles.helpExampleSection}>
                <h4>You'll get:</h4>
                <ul>
                  <li>Gross Commission: $25,222.20</li>
                  <li>Buyer's Agent: $11,602.21</li>
                  <li>Seller's Agent: $13,619.99</li>
                  <li>GST: $1,261.11</li>
                  <li>Seller's Net: $802,404.69</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    
      {/* Hero Section */}
      <section ref={heroRef} className={styles.heroSection}>
        <div className={styles.heroOverlay}></div>
        <div className={`${styles.heroContent} ${isHeroVisible ? styles.visible : ''}`}>
          <h1 className={styles.heroTitle}>BC Real Estate Commission Calculator</h1>
          <p className={styles.heroSubtitle}>
            Calculate commission splits for British Columbia real estate transactions
          </p>
        </div>
      </section>
      
      {/* Calculator Section */}
      <section ref={calculatorRef} className={styles.calculatorSection}>
        <div className={styles.container}>
          <div className={`${styles.calculatorContent} ${isCalculatorVisible ? styles.visible : ''}`}>
            <div className={styles.calculatorCard}>
              <div className={styles.calculatorHeader}>
                <img src={logo} alt="CANACON Logo" className={styles.calculatorLogo} />
                <h2 className={styles.calculatorTitle}>Commission Calculator</h2>
                <button
                  className={styles.helpButton}
                  onClick={() => toggleHelpModal(true)}
                  title="How to use this calculator"
                >
                  <span role="img" aria-label="question mark">❔</span> Help
                </button>
              </div>
              
              <div className={styles.calculatorForm}>
                <div className={styles.formSection}>
                  <div className={styles.formGroup}>
                    <label htmlFor="offerPrice">Offer Price</label>
                    <div className={styles.inputWrapper}>
                      <span className={styles.currencySymbol}>$</span>
                      <input
                        id="offerPrice"
                        name="offerPrice"
                        type="text"
                        value={formData.offerPrice}
                        onChange={handleInputChange}
                        placeholder="828,888.00"
                      />
                    </div>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="commissionSplit">Total Commission Split</label>
                    <div className={styles.splitInputs}>
                      <div className={styles.inputWrapperSmall}>
                        <input
                          id="firstCommission"
                          name="firstCommission"
                          type="text"
                          value={formData.firstCommission === '7' && !formData.firstCommissionTouched ? '' : formData.firstCommission}
                          onChange={handleInputChange}
                          placeholder="7"
                        />
                        <span className={styles.percentSymbol}>%</span>
                      </div>
                      <span className={styles.splitText}>on first $100K</span>
                      
                      <div className={styles.inputWrapperSmall}>
                        <input
                          id="remainderCommission"
                          name="remainderCommission"
                          type="text"
                          value={formData.remainderCommission === '2.5' && !formData.remainderCommissionTouched ? '' : formData.remainderCommission}
                          onChange={handleInputChange}
                          placeholder="2.5"
                        />
                        <span className={styles.percentSymbol}>%</span>
                      </div>
                      <span className={styles.splitText}>on remainder</span>
                    </div>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="coopSplit">Co-operating Split</label>
                    <div className={styles.splitInputs}>
                      <div className={styles.inputWrapperSmall}>
                        <input
                          id="firstCoopSplit"
                          name="firstCoopSplit"
                          type="text"
                          value={formData.firstCoopSplit === '3.22' && !formData.firstCoopSplitTouched ? '' : formData.firstCoopSplit}
                          onChange={handleInputChange}
                          placeholder="3.22"
                        />
                        <span className={styles.percentSymbol}>%</span>
                      </div>
                      <span className={styles.splitText}>on first $100K</span>
                      
                      <div className={styles.inputWrapperSmall}>
                        <input
                          id="remainderCoopSplit"
                          name="remainderCoopSplit"
                          type="text"
                          value={formData.remainderCoopSplit === '1.15' && !formData.remainderCoopSplitTouched ? '' : formData.remainderCoopSplit}
                          onChange={handleInputChange}
                          placeholder="1.15"
                        />
                        <span className={styles.percentSymbol}>%</span>
                      </div>
                      <span className={styles.splitText}>on remainder</span>
                    </div>
                  </div>
                  
                  <div className={styles.buttonRow}>
                    <button 
                      className={styles.resetButton}
                      onClick={handleReset}
                    >
                      Reset Calculator
                    </button>
                  </div>
                </div>
                
                <div className={styles.resultsSection}>
                  <h3 className={styles.resultsTitle}>Commission Breakdown</h3>
                  
                  <div className={styles.resultItem}>
                    <span className={styles.resultLabel}>Gross Commission:</span>
                    <span className={styles.resultValue}>{formatCurrency(results.grossCommission)}</span>
                  </div>
                  
                  <div className={styles.resultItem}>
                    <span className={styles.resultLabel}>Co-operating Brokerage (Buyer's Realtor):</span>
                    <span className={styles.resultValue}>{formatCurrency(results.coopBrokerage)}</span>
                  </div>
                  
                  <div className={styles.resultItem}>
                    <span className={styles.resultLabel}>Listing Brokerage (Seller's Realtor):</span>
                    <span className={styles.resultValue}>{formatCurrency(results.listingBrokerage)}</span>
                  </div>
                  
                  <div className={styles.resultItem}>
                    <span className={styles.resultLabel}>GST (5%):</span>
                    <span className={styles.resultValue}>{formatCurrency(results.gst)}</span>
                  </div>
                  
                  <div className={`${styles.resultItem} ${styles.finalResult}`}>
                    <span className={styles.resultLabel}>Seller's Net:</span>
                    <span className={styles.resultValue}>{formatCurrency(results.sellerNet)}</span>
                  </div>
                </div>
              </div>
              
              <p className={styles.calculatorNote}>
                Note: This calculator provides estimates based on standard BC real estate commission structure. Actual commissions may vary.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section ref={faqRef} className={styles.faqSection}>
        <div className={styles.container}>
          <div className={`${styles.faqContent} ${isFaqVisible ? styles.visible : ''}`}>
            <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
            
            <div className={styles.faqGrid}>
              <div className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>How does the BC commission structure work?</h3>
                <p className={styles.faqAnswer}>In British Columbia, real estate commissions are typically calculated using a split percentage structure. A higher percentage is applied to the first $100,000 of the sale price, and a lower percentage is applied to the remainder.</p>
              </div>
              
              <div className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>What is the co-operating split?</h3>
                <p className={styles.faqAnswer}>The co-operating split refers to how the total commission is divided between the listing brokerage (seller's realtor) and the co-operating brokerage (buyer's realtor). In BC, this split is often structured as a percentage on the first $100,000 and a different percentage on the remainder.</p>
              </div>
              
              <div className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>Is GST applied to real estate commissions?</h3>
                <p className={styles.faqAnswer}>Yes, in Canada, the Goods and Services Tax (GST) of 5% is applied to the gross commission amount. This is an additional cost typically paid by the seller.</p>
              </div>
              
              <div className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>Are commission rates negotiable?</h3>
                <p className={styles.faqAnswer}>Yes, commission rates are negotiable between sellers and listing agents. While this calculator uses common BC commission structures, actual rates may vary based on negotiation and the specific services provided.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CommissionCalculator; 