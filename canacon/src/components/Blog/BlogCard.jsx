import React from 'react';
import { Link } from 'react-router-dom';
import { MotionDiv } from '../common/MotionWrapper';
import styles from './BlogCard.module.css';

const BlogCard = ({ post, index }) => {
  return (
    <MotionDiv 
      className={styles.blogCard}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className={styles.imageContainer}>
        <img src={post.image} alt={post.title} className={styles.image} />
        <div className={styles.category}>
          <span>{post.category}</span>
        </div>
      </div>
      
      <div className={styles.content}>
        <div className={styles.metadata}>
          <span className={styles.date}>{post.date}</span>
          <span className={styles.dot}>•</span>
          <span className={styles.readTime}>{post.readTime} min read</span>
        </div>
        
        <h3 className={styles.title}>{post.title}</h3>
        
        <p className={styles.excerpt}>{post.excerpt}</p>
        
        <Link to={`/blog/${post.slug}`} className={styles.readMore}>
          Read More
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.4301 5.92999L20.5001 12L14.4301 18.07" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3.5 12H20.33" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>
    </MotionDiv>
  );
};

export default BlogCard; 