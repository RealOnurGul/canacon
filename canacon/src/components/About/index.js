import React from 'react';
import styles from './About.module.css';

const About = () => {
  return (
    <section className={styles.about} id="about">
      <div className={styles.container}>
        <div className={styles.aboutContent}>
          <div className={styles.aboutImage}>
            <div className={styles.imageWrapper}>
              <img src="/images/about/team.jpg" alt="Our Team" />
            </div>
            <div className={styles.experience}>
              <span className={styles.experienceNumber}>10+</span>
              <span className={styles.experienceText}>Years<br/>Experience</span>
            </div>
          </div>
          
          <div className={styles.aboutInfo}>
            <span className={styles.sectionTag}>About Us</span>
            <h2 className={styles.sectionTitle}>We're a Digital Agency With a Passion for Results</h2>
            <p className={styles.aboutDescription}>
              At Canacon Media, we believe in delivering measurable results through data-driven 
              marketing strategies. Our team combines creativity with analytical thinking to help 
              businesses grow their digital presence and achieve their marketing goals.
            </p>
            
            <div className={styles.aboutStats}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>500+</span>
                <span className={styles.statLabel}>Happy Clients</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>650+</span>
                <span className={styles.statLabel}>Projects Completed</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>15+</span>
                <span className={styles.statLabel}>Team Members</span>
              </div>
            </div>
            
            <div className={styles.aboutValues}>
              <div className={styles.valueItem}>
                <h3 className={styles.valueTitle}>Our Mission</h3>
                <p className={styles.valueText}>
                  To empower businesses with innovative digital solutions that drive growth and deliver exceptional ROI.
                </p>
              </div>
              
              <div className={styles.valueItem}>
                <h3 className={styles.valueTitle}>Our Vision</h3>
                <p className={styles.valueText}>
                  To be the leading digital marketing agency known for creativity, reliability, and measurable results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 