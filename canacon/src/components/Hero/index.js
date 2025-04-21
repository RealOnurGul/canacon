import React from "react";
import { Link } from "react-scroll";
import { HiChevronRight } from "react-icons/hi";
import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={styles.hero} id="home">
      <div className={styles.overlay}></div>
      <div className={styles.shapeTop}></div>
      
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Superior Digital Marketing Sells More.
          </h1>
          
          <p className={styles.description}>
            Our team combines insight, strategy, technology, and creativity to craft digital marketing solutions that simply work.
          </p>
          
          <div className={styles.actions}>
            <Link 
              to="contact" 
              smooth={true} 
              duration={800} 
              className={styles.primaryBtn}
            >
              CONTACT US
            </Link>
          </div>
        </div>
        
        <div className={styles.heroMedia}>
          <div className={styles.mediaWrapper}>
            <div className={styles.mediaContent}>
              <div className={styles.floatingElement1}></div>
              <div className={styles.floatingElement2}></div>
              <div className={styles.floatingElement3}></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.shapeBottom}></div>
    </section>
  );
};

export default Hero; 