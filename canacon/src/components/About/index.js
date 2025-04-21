import React from "react";
import styles from "./About.module.css";
import { HiOutlineDesktopComputer, HiOutlineCog, HiOutlineLightningBolt } from "react-icons/hi";

const About = () => {
  return (
    <section id="about" className={styles.about}>
      <div className="container">
        <h2 className={styles.sectionTitle}>The leading team of digital craftsmen</h2>
        
        <div className={styles.grid}>
          <div className={styles.mainContent}>
            <p className={styles.leadText}>
              For over a decade, we've been at the forefront of web development, 
              delivering cutting-edge solutions that transform businesses and elevate brands.
            </p>
            
            <p className={styles.bodyText}>
              Our team combines technical excellence with creative vision to build digital 
              experiences that not only look exceptional but drive measurable results. 
              We're obsessed with performance, accessibility, and creating memorable user journeys.
            </p>
          </div>
        </div>
        
        <div className={styles.cardsContainer}>
          <div className={styles.card}>
            <div className={styles.cardIcon}>
              <HiOutlineDesktopComputer aria-hidden="true" />
            </div>
            <h3>Expert Development</h3>
            <p>
              We build powerful, scalable web applications using the latest technologies 
              and frameworks. Our code is clean, maintainable, and optimized for performance.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.cardIcon}>
              <HiOutlineCog aria-hidden="true" />
            </div>
            <h3>Strategic Planning</h3>
            <p>
              We don't just build websites; we create digital strategies that align with 
              your business goals and provide measurable ROI through thoughtful implementation.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.cardIcon}>
              <HiOutlineLightningBolt aria-hidden="true" />
            </div>
            <h3>Powerful Optimization</h3>
            <p>
              We obsess over speed, accessibility, and conversion. Our optimization services 
              ensure your digital products perform flawlessly across all devices and platforms.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 