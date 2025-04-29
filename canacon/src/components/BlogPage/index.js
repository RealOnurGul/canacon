import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./BlogPage.module.css";
import logoImage from "../../assets/images/canacon_square_logo.png";

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
      title: "5 Emerging Real Estate Trends in 2023",
      excerpt: "Discover the top five real estate trends shaping the market this year, from sustainable building practices to the rise of smart home technology integration.",
      date: "March 15, 2025",
      category: "Real Estate",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
      author: {
        name: "Onur Gul",
        avatar: logoImage
      },
      slug: "emerging-real-estate-trends-2023"
    },
    {
      id: 2,
      title: "How Microdata Can Boost Your Website's SEO",
      slug: "microdata-boost-website-seo",
      excerpt: "Learn how implementing structured data and microdata can significantly improve your website's search engine visibility and click-through rates.",
      date: "April 3, 2025",
      category: "SEO",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
      author: {
        name: "Onur Gul",
        avatar: logoImage
      }
    },
    {
      id: 3,
      title: "The Impact of AI on Modern Web Development",
      slug: "ai-impact-modern-web-development",
      excerpt: "Explore how artificial intelligence is revolutionizing web development, from automated testing to personalized user experiences and smart content creation.",
      date: "May 12, 2025",
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
      author: {
        name: "Onur Gul",
        avatar: logoImage
      }
    },
    {
      id: 4,
      title: "Virtual Tours: Transforming Real Estate Marketing",
      slug: "virtual-tours-real-estate-marketing",
      excerpt: "Discover how virtual tour technology is changing how properties are marketed and sold, offering immersive experiences for potential buyers regardless of location.",
      date: "June 5, 2025",
      category: "Real Estate",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
      author: {
        name: "Onur Gul",
        avatar: logoImage
      }
    },
    {
      id: 5,
      title: "Responsive Design Best Practices for 2023",
      slug: "responsive-design-best-practices-2023",
      excerpt: "Learn the latest responsive design techniques to ensure your website provides an optimal viewing experience across all devices and screen sizes.",
      date: "July 1, 2025",
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
      author: {
        name: "Onur Gul",
        avatar: logoImage
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