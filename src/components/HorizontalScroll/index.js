import React, { useRef } from 'react';
import { MotionDiv } from '../common/MotionWrapper';
import styles from './HorizontalScroll.module.css';

const HorizontalScroll = () => {
  const containerRef = useRef(null);

  const panels = [
    {
      id: 1,
      title: 'Strategic Planning',
      description: 'We begin with a deep analysis of your business goals and market positioning to develop a tailored digital strategy.'
    },
    {
      id: 2,
      title: 'Design & Development',
      description: 'Our expert team crafts elegant, functional solutions using cutting-edge technologies and design principles.'
    },
    {
      id: 3,
      title: 'Implementation',
      description: 'We meticulously execute the plan, ensuring every detail meets our high standards for quality and performance.'
    },
    {
      id: 4,
      title: 'Ongoing Support',
      description: 'Our relationship continues with dedicated support, optimization, and strategic guidance to drive long-term success.'
    }
  ];

  return (
    <section className={styles.horizontalSection} ref={containerRef}>
      <div className={styles.stickyContainer}>
        <div className={styles.heading}>
          <h2>Our Process</h2>
          <div className={styles.underline}></div>
        </div>
        
        <div className={styles.horizontalContent}>
          {panels.map(panel => (
            <MotionDiv
              className={styles.panel} 
              key={panel.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: panel.id * 0.1 }}
            >
              <div className={styles.panelContent}>
                <span className={styles.number}>0{panel.id}</span>
                <h3>{panel.title}</h3>
                <p>{panel.description}</p>
              </div>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HorizontalScroll; 