import React from "react";
import { motion } from "framer-motion";
import BlogCard from "../components/BlogCard";
import { FaBlog } from "react-icons/fa";
import mobileApp from "../assets/blog/mobile-app.jpg";
import blockchainImg from "../assets/blog/blockchain.jpg";
import aiImg from "../assets/blog/ai.jpg";
import uxDesign from "../assets/blog/ux-design.jpg";
import cyberSecurity from "../assets/blog/cyber-security.jpg";
import cloudComputing from "../assets/blog/cloud-computing.jpg";

const blogPosts = [
  {
    id: 1,
    title: "The Future of Mobile Application Development",
    category: "Technology",
    image: mobileApp,
    description: "Explore the newest trends in mobile app development including cross-platform frameworks and progressive web apps.",
    date: "June 12, 2023",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Blockchain Technology: Beyond Cryptocurrency",
    category: "Technology",
    image: blockchainImg,
    description: "Discover how blockchain is revolutionizing industries beyond finance, from supply chain to healthcare.",
    date: "May 28, 2023",
    readTime: "7 min read",
  },
  {
    id: 3,
    title: "Artificial Intelligence in Everyday Life",
    category: "Technology",
    image: aiImg,
    description: "Learn how AI is quietly transforming our daily routines, from smart assistants to recommendation algorithms.",
    date: "May 15, 2023",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "UX Design Principles for Better Conversion",
    category: "Design",
    image: uxDesign,
    description: "Understand the psychological principles behind UX design that drive user engagement and conversion.",
    date: "April 30, 2023",
    readTime: "8 min read",
  },
  {
    id: 5,
    title: "Cybersecurity Best Practices for Small Businesses",
    category: "Technology",
    image: cyberSecurity,
    description: "Essential security measures that small businesses should implement to protect their data and customers.",
    date: "April 22, 2023",
    readTime: "5 min read",
  },
  {
    id: 6,
    title: "Cloud Computing: Choosing the Right Provider",
    category: "Technology",
    image: cloudComputing,
    description: "A comprehensive comparison of major cloud service providers and how to select the best one for your needs.",
    date: "April 10, 2023",
    readTime: "7 min read",
  },
];

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center"
          >
            <FaBlog className="text-5xl mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our Blog
            </h1>
            <p className="text-xl max-w-2xl">
              Stay updated with the latest insights, news, and trends in technology and design.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <BlogCard
                title={post.title}
                category={post.category}
                image={post.image}
                description={post.description}
                date={post.date}
                readTime={post.readTime}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage; 