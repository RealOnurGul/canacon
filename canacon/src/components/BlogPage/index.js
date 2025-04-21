import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "./BlogPage.module.css";
import { blog1, blog2, blog3, blog4, blog5, blog6 } from "../../assets/images/blog1.js";

const BlogPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  const blogPosts = [
    {
      id: 1,
      title: "Selin Gul and Brian Buffini | REMAX R4 2022",
      excerpt: "Selin Gul asked Brian Buffini a great question during Brian's presentation at REMAX R4 2022 in Las Vegas at the MGM Grand. She asked his recommendation for navigating...",
      date: "May 15, 2022",
      author: "Canacon Media",
      slug: "selin-gul-brian-buffini-remax-r4-2022",
      image: "https://images.unsplash.com/photo-1564769662533-4f00a87b4056?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
    },
    {
      id: 2,
      title: "Getting Started with Cannabis: A Beginner's Guide",
      slug: "getting-started-with-cannabis",
      excerpt: "New to cannabis? Learn the basics of cannabis consumption, including different methods, strains, and what to expect for first-time users.",
      date: "June 15, 2023",
      category: "Beginners",
      image: blog1,
      author: {
        name: "Jane Smith",
        avatar: "https://randomuser.me/api/portraits/women/65.jpg"
      }
    },
    {
      id: 3,
      title: "Understanding Cannabis Strains: Indica vs. Sativa vs. Hybrid",
      slug: "understanding-cannabis-strains",
      excerpt: "Dive deep into the world of cannabis strains and learn the differences between indica, sativa, and hybrid varieties.",
      date: "July 3, 2023",
      category: "Education",
      image: blog2,
      author: {
        name: "Mike Johnson",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      }
    },
    {
      id: 4,
      title: "The Medical Benefits of Cannabis: What Research Says",
      slug: "medical-benefits-of-cannabis",
      excerpt: "Explore the scientifically-backed medical benefits of cannabis, from pain management to anxiety relief and beyond.",
      date: "July 28, 2023",
      category: "Medical",
      image: blog3,
      author: {
        name: "Dr. Sarah Williams",
        avatar: "https://randomuser.me/api/portraits/women/33.jpg"
      }
    },
    {
      id: 5,
      title: "Cannabis and Wellness: Incorporating CBD into Your Daily Routine",
      slug: "cannabis-and-wellness",
      excerpt: "Discover how CBD products can enhance your wellness routine, from sleep improvement to stress reduction.",
      date: "August 12, 2023",
      category: "Wellness",
      image: blog4,
      author: {
        name: "Emma Thompson",
        avatar: "https://randomuser.me/api/portraits/women/24.jpg"
      }
    },
    {
      id: 6,
      title: "The History of Cannabis: From Ancient Times to Modern Day",
      slug: "history-of-cannabis",
      excerpt: "Take a journey through time and discover the fascinating history of cannabis use across different cultures and eras.",
      date: "September 5, 2023",
      category: "Culture",
      image: blog5,
      author: {
        name: "Prof. Robert Chen",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg"
      }
    },
    {
      id: 7,
      title: "Cannabis Legalization: Current Status and Future Outlook",
      slug: "cannabis-legalization",
      excerpt: "Get updated on the current legal status of cannabis around the world and what the future might hold for legalization efforts.",
      date: "October 21, 2023",
      category: "Legal",
      image: blog6,
      author: {
        name: "Alexandra Davis",
        avatar: "https://randomuser.me/api/portraits/women/48.jpg"
      }
    }
  ];

  return (
    <div className={styles.blogPage}>
      <div className={styles.blogHero}>
        <div className={styles.container}>
          <h1 className={`${styles.pageTitle} ${isVisible ? styles.visible : ""}`}>
            From Our Blog
          </h1>
          <div className={`${styles.underline} ${isVisible ? styles.visible : ""}`}></div>
          <p className={`${styles.pageDescription} ${isVisible ? styles.visible : ""}`}>
            Stay up to date on current news, trends, and resources.
          </p>
        </div>
      </div>
      
      <div className={styles.blogContent}>
        <div className={styles.container}>
          <div className={`${styles.blogGrid} ${isVisible ? styles.visible : ""}`}>
            {blogPosts.map((post) => (
              <div key={post.id} className={styles.blogItem}>
                <Link to={`/blog/${post.slug}`} className={styles.blogCard}>
                  <div className={styles.blogImage}>
                    <img src={post.image} alt={post.title} />
                  </div>
                  <div className={styles.blogInfo}>
                    <div className={styles.blogMeta}>
                      <span className={styles.blogDate}>{post.date}</span>
                      <span className={styles.blogAuthor}>by {post.author.name}</span>
                    </div>
                    <h3 className={styles.blogTitle}>{post.title}</h3>
                    <p className={styles.blogExcerpt}>{post.excerpt}</p>
                    <span className={styles.readMore}>Read More</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage; 