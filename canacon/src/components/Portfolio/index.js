import React, { useState, useEffect, useRef } from 'react';
import styles from './Portfolio.module.css';

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [isVisible, setIsVisible] = useState({
    heading: false,
    tabs: false,
    projects: false
  });
  
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(prev => ({ ...prev, heading: true })), 100);
          setTimeout(() => setIsVisible(prev => ({ ...prev, tabs: true })), 300);
          setTimeout(() => setIsVisible(prev => ({ ...prev, projects: true })), 500);
          
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

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Redesign',
      category: 'web',
      description: 'Complete redesign and development of an e-commerce platform with focus on user experience and conversion optimization.',
    },
    {
      id: 2,
      title: 'Data Visualization Dashboard',
      category: 'data',
      description: 'Interactive dashboard for real-time data analysis, featuring complex visualizations and automated reporting.',
    },
    {
      id: 3,
      title: 'Corporate Website',
      category: 'web',
      description: 'Modern, responsive website with custom CMS integration for a Fortune 500 company.',
    },
    {
      id: 4,
      title: 'SEO Strategy Implementation',
      category: 'seo',
      description: 'Comprehensive SEO strategy resulting in 250% increase in organic traffic and improved SERP rankings.',
    },
    {
      id: 5,
      title: 'Frontend Architecture Audit',
      category: 'consulting',
      description: 'In-depth analysis and optimization of frontend architecture for a high-traffic web application.',
    },
    {
      id: 6,
      title: 'Microdata Implementation',
      category: 'seo',
      description: 'Strategic implementation of structured data to enhance search visibility and rich snippet performance.',
    }
  ];

  const filterProjects = () => {
    if (activeTab === 'all') {
      return projects;
    }
    return projects.filter(project => project.category === activeTab);
  };

  const filteredProjects = filterProjects();

  return (
    <section className={styles.portfolio} itemScope itemType="https://schema.org/Organization" ref={sectionRef}>
      <div className={styles.container}>
        <div
          className={`${styles.heading} ${isVisible.heading ? styles.visible : ''}`}
        >
          <h2 itemProp="name">Case Studies</h2>
          <div className={styles.underline}></div>
          <p>Explore our portfolio of successful client projects and transformations.</p>
        </div>

        <div
          className={`${styles.tabs} ${isVisible.tabs ? styles.visible : ''}`}
        >
          <button 
            className={`${styles.tab} ${activeTab === 'all' ? styles.active : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'web' ? styles.active : ''}`}
            onClick={() => setActiveTab('web')}
          >
            Web Development
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'data' ? styles.active : ''}`}
            onClick={() => setActiveTab('data')}
          >
            Data
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'seo' ? styles.active : ''}`}
            onClick={() => setActiveTab('seo')}
          >
            SEO
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'consulting' ? styles.active : ''}`}
            onClick={() => setActiveTab('consulting')}
          >
            Consulting
          </button>
        </div>

        <div className={styles.projectGrid}>
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`${styles.projectCard} ${isVisible.projects ? styles.visible : ''}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
              itemScope 
              itemType="https://schema.org/CreativeWork"
            >
              <div className={styles.projectImage}></div>
              <div className={styles.projectContent}>
                <h3 itemProp="name">{project.title}</h3>
                <p itemProp="description">{project.description}</p>
                <a href="#" className={styles.viewProject}>View Case Study</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio; 