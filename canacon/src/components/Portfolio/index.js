import React, { useState } from 'react';
import styles from './Portfolio.module.css';

const Portfolio = () => {
  const [filter, setFilter] = useState('all');
  
  const projects = [
    {
      id: 1,
      title: "E-commerce Website Redesign",
      category: "web-design",
      image: "/images/portfolio/project1.jpg",
      client: "Fashion Retailer",
      description: "Complete redesign of an e-commerce platform resulting in 45% increase in conversion rate.",
      link: "#"
    },
    {
      id: 2,
      title: "SEO Campaign",
      category: "digital-marketing",
      image: "/images/portfolio/project2.jpg",
      client: "Software Company",
      description: "Comprehensive SEO strategy that increased organic traffic by 200% in 6 months.",
      link: "#"
    },
    {
      id: 3,
      title: "Social Media Campaign",
      category: "social-media",
      image: "/images/portfolio/project3.jpg",
      client: "Wellness Brand",
      description: "Strategic social media campaign that grew following by 150% and engagement by 300%.",
      link: "#"
    },
    {
      id: 4,
      title: "Mobile App Development",
      category: "app-development",
      image: "/images/portfolio/project4.jpg",
      client: "Fitness Startup",
      description: "Custom mobile application with integrated payment system and user analytics.",
      link: "#"
    },
    {
      id: 5,
      title: "Content Marketing Strategy",
      category: "digital-marketing",
      image: "/images/portfolio/project5.jpg",
      client: "Financial Services",
      description: "Content strategy that positioned the client as an industry thought leader.",
      link: "#"
    },
    {
      id: 6,
      title: "Email Marketing Campaign",
      category: "digital-marketing",
      image: "/images/portfolio/project6.jpg",
      client: "Travel Agency",
      description: "Email sequence that achieved 35% open rate and 12% conversion rate.",
      link: "#"
    }
  ];
  
  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'web-design', name: 'Web Design' },
    { id: 'digital-marketing', name: 'Digital Marketing' },
    { id: 'social-media', name: 'Social Media' },
    { id: 'app-development', name: 'App Development' }
  ];
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);
  
  return (
    <section className={styles.portfolio} id="portfolio">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Our Work</span>
          <h2 className={styles.sectionTitle}>Recent Projects</h2>
          <p className={styles.sectionDescription}>
            Take a look at some of our recent projects that showcase our expertise 
            and the results we deliver for our clients.
          </p>
        </div>
        
        <div className={styles.filterButtons}>
          {categories.map(category => (
            <button 
              key={category.id}
              className={`${styles.filterBtn} ${filter === category.id ? styles.activeFilter : ''}`}
              onClick={() => setFilter(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        <div className={styles.projectsGrid}>
          {filteredProjects.map(project => (
            <div key={project.id} className={styles.projectCard}>
              <div className={styles.projectImage}>
                <img src={project.image} alt={project.title} />
                <div className={styles.projectOverlay}>
                  <a href={project.link} className={styles.projectLink}>
                    View Project
                  </a>
                </div>
              </div>
              <div className={styles.projectInfo}>
                <span className={styles.projectCategory}>
                  {categories.find(c => c.id === project.category)?.name}
                </span>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectDescription}>{project.description}</p>
                <div className={styles.projectClient}>
                  <span className={styles.clientLabel}>Client:</span>
                  <span className={styles.clientName}>{project.client}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className={styles.ctaContainer}>
          <a href="/contact" className={styles.ctaButton}>
            Start Your Project
          </a>
        </div>
      </div>
    </section>
  );
};

export default Portfolio; 