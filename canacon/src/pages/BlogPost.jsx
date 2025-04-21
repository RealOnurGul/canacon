import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { blog1, blog2, blog3, blog4, blog5, blog6 } from "../assets/images/blog1.js";
import styles from "./BlogPost.module.css";

// Sample blog data
const blogPosts = [
  {
    id: 1,
    title: "Getting Started with Cannabis: A Beginner's Guide",
    slug: "getting-started-with-cannabis",
    excerpt: "New to cannabis? Learn the basics of cannabis consumption, including different methods, strains, and what to expect for first-time users.",
    content: `
      <p>Cannabis can seem intimidating to newcomers, especially with the wide variety of products and consumption methods available today. This guide aims to provide an easy-to-understand introduction to cannabis for beginners.</p>
      
      <h3>Understanding Cannabis</h3>
      <p>Cannabis is a plant with psychoactive properties due to compounds called cannabinoids. The two most well-known cannabinoids are THC (tetrahydrocannabinol), which produces the "high" feeling, and CBD (cannabidiol), which offers many therapeutic benefits without the intoxicating effects.</p>
      
      <h3>Common Consumption Methods</h3>
      <ul>
        <li><strong>Smoking:</strong> The traditional method of consuming cannabis is by smoking dried flower in a pipe, bong, or rolled into a joint. Effects are typically felt within minutes and last 2-4 hours.</li>
        <li><strong>Vaporizing:</strong> Vaporizers heat cannabis to a temperature that releases cannabinoids without combustion, creating a vapor that is generally considered less harmful than smoke.</li>
        <li><strong>Edibles:</strong> Cannabis can be infused into foods and beverages. Effects take longer to onset (30-90 minutes) but can last 4-8 hours. Start with a low dose (5mg THC or less) and wait at least 2 hours before consuming more.</li>
        <li><strong>Tinctures:</strong> Liquid cannabis extracts that are applied under the tongue. They offer precise dosing and effects within 15-45 minutes.</li>
        <li><strong>Topicals:</strong> Cannabis-infused lotions and balms applied to the skin for localized relief without psychoactive effects.</li>
      </ul>
      
      <h3>Cannabis Strains</h3>
      <p>Cannabis strains are typically categorized as indica, sativa, or hybrid:</p>
      <ul>
        <li><strong>Indica:</strong> Generally associated with relaxing, body-centered effects. Often used for relaxation, pain relief, and sleep.</li>
        <li><strong>Sativa:</strong> Typically linked to energizing, cerebral effects. Often used for creativity, focus, and mood elevation.</li>
        <li><strong>Hybrid:</strong> Crosses between indica and sativa that can provide a balance of effects or emphasize specific traits.</li>
      </ul>
      
      <h3>Tips for First-Time Users</h3>
      <ol>
        <li>Start with a low dose and go slow. You can always consume more, but you can't reduce the effects once they've begun.</li>
        <li>Choose a comfortable, safe environment with people you trust.</li>
        <li>Have water and snacks available.</li>
        <li>Don't mix cannabis with alcohol or other substances, especially for your first experience.</li>
        <li>Don't drive or operate machinery after consuming cannabis.</li>
        <li>Remember that different strains and products can produce varied effects.</li>
      </ol>
      
      <h3>Responsible Use</h3>
      <p>As with any substance, responsible use is crucial. Be aware of the legal status of cannabis in your area, understand your own limits, and consume in moderation.</p>
      
      <p>By approaching cannabis with knowledge and respect, beginners can have a positive and beneficial experience with this versatile plant.</p>
    `,
    image: blog1,
    category: 'Beginners',
    date: 'June 15, 2023',
    readTime: 5,
    author: {
      name: 'Jane Smith',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
      bio: 'Jane is a cannabis educator with over 5 years of experience helping beginners navigate the world of cannabis.'
    }
  },
  {
    id: 2,
    title: 'Understanding Cannabis Strains: Indica vs. Sativa vs. Hybrid',
    slug: 'understanding-cannabis-strains',
    excerpt: 'Dive deep into the world of cannabis strains and learn the differences between indica, sativa, and hybrid varieties.',
    content: `
      <p>One of the most fundamental aspects of cannabis is understanding the different types of strains available and how they might affect you. While modern science has shown that the effects of cannabis are more complex than simple strain categories, these traditional classifications still provide a useful framework for beginners.</p>
      
      <h3>The Three Main Categories</h3>
      <p>Cannabis strains are traditionally divided into three main categories:</p>
      
      <h4>Indica Strains</h4>
      <p>Cannabis indica plants are typically shorter and bushier with broader leaves. They originated in the harsh, dry climates of the Middle East and Asia. Indica strains are often associated with:</p>
      <ul>
        <li>Full-body relaxation</li>
        <li>Sedating effects</li>
        <li>Relief from pain and inflammation</li>
        <li>Help with insomnia and sleep issues</li>
        <li>Reduction in anxiety and stress</li>
      </ul>
      <p>Popular indica strains include Northern Lights, Granddaddy Purple, and Hindu Kush.</p>
      
      <h4>Sativa Strains</h4>
      <p>Cannabis sativa plants tend to be taller with narrower leaves. They evolved in equatorial regions with longer growing seasons. Sativa strains are often associated with:</p>
      <ul>
        <li>Cerebral, uplifting effects</li>
        <li>Increased energy and focus</li>
        <li>Enhanced creativity and productivity</li>
        <li>Mood elevation</li>
        <li>Daytime use</li>
      </ul>
      <p>Popular sativa strains include Jack Herer, Durban Poison, and Sour Diesel.</p>
      
      <h4>Hybrid Strains</h4>
      <p>Hybrid strains are crossbreeds of indica and sativa plants. They were developed to combine or emphasize specific characteristics from each parent. Hybrids can be:</p>
      <ul>
        <li>Indica-dominant: Offering primarily indica effects with some sativa influence</li>
        <li>Sativa-dominant: Offering primarily sativa effects with some indica influence</li>
        <li>Balanced: Providing relatively equal effects from both parent types</li>
      </ul>
      <p>Popular hybrid strains include Blue Dream, Wedding Cake, and Pineapple Express.</p>
      
      <h3>Beyond Indica and Sativa</h3>
      <p>Modern research has shown that a strain's effects are determined by more than just its botanical category. The specific cannabinoid and terpene profile of each strain plays a major role in its effects. This is why two different indica strains can provide noticeably different experiences.</p>
      
      <h3>How to Choose the Right Strain</h3>
      <p>When selecting a strain, consider:</p>
      <ol>
        <li>Your experience level with cannabis</li>
        <li>The specific effects you're seeking</li>
        <li>The time of day you plan to consume</li>
        <li>Any particular symptoms you're hoping to address</li>
        <li>Your sensitivity to THC</li>
      </ol>
      
      <p>Remember that individual responses to cannabis can vary significantly. What works well for one person may affect another differently. Start with lower THC strains if you're new to cannabis, and keep track of which strains and products work best for your needs.</p>
    `,
    image: blog2,
    category: 'Education',
    date: 'July 3, 2023',
    readTime: 7,
    author: {
      name: 'Mike Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      bio: 'Mike is a cannabis strain specialist who has worked with dispensaries across multiple legal states.'
    }
  },
  {
    id: 3,
    title: 'The Medical Benefits of Cannabis: What Research Says',
    slug: 'medical-benefits-of-cannabis',
    excerpt: 'Explore the scientifically-backed medical benefits of cannabis, from pain management to anxiety relief and beyond.',
    content: `
      <p>Cannabis has been used medicinally for thousands of years, but only in recent decades has modern science begun to validate many of its traditional applications. As research continues and legal barriers fall, we're gaining a clearer picture of cannabis's therapeutic potential.</p>
      
      <h3>Pain Management</h3>
      <p>One of the most well-established medical uses of cannabis is pain relief. Research shows that cannabinoids can help with:</p>
      <ul>
        <li>Chronic pain conditions</li>
        <li>Neuropathic pain</li>
        <li>Inflammatory pain</li>
        <li>Pain associated with multiple sclerosis and rheumatoid arthritis</li>
      </ul>
      <p>The pain-relieving effects come from how cannabinoids interact with the body's endocannabinoid system, which helps regulate pain sensation.</p>
      
      <h3>Neurological Disorders</h3>
      <p>Cannabis and its derivatives have shown promise for several neurological conditions:</p>
      <ul>
        <li><strong>Epilepsy:</strong> CBD has been FDA-approved (as Epidiolex) for certain severe forms of epilepsy, including Dravet syndrome and Lennox-Gastaut syndrome.</li>
        <li><strong>Multiple Sclerosis:</strong> Cannabis-based medications can help reduce muscle spasticity and pain in MS patients.</li>
        <li><strong>Parkinson's Disease:</strong> Some research suggests cannabis may help manage tremors and improve motor control.</li>
      </ul>
      
      <h3>Mental Health</h3>
      <p>While high-THC cannabis can sometimes worsen anxiety or psychosis in susceptible individuals, appropriate cannabinoid therapy may help with:</p>
      <ul>
        <li><strong>Anxiety disorders:</strong> CBD shows particular promise for reducing anxiety without intoxicating effects.</li>
        <li><strong>PTSD:</strong> Some studies suggest cannabis can help reduce nightmares and improve sleep in PTSD patients.</li>
        <li><strong>Depression:</strong> Emerging research indicates certain cannabinoids may have antidepressant-like effects.</li>
      </ul>
      
      <h3>Cancer-Related Symptoms</h3>
      <p>Cannabis can help cancer patients by:</p>
      <ul>
        <li>Reducing nausea and vomiting during chemotherapy</li>
        <li>Stimulating appetite to prevent wasting</li>
        <li>Managing cancer-related pain</li>
        <li>Improving quality of life</li>
      </ul>
      <p>Some laboratory studies also suggest certain cannabinoids may have anti-tumor properties, though human clinical trials are still needed.</p>
      
      <h3>Other Potential Benefits</h3>
      <p>Research is ongoing into cannabis's potential benefits for:</p>
      <ul>
        <li>Inflammatory bowel diseases like Crohn's disease</li>
        <li>Sleep disorders</li>
        <li>Glaucoma</li>
        <li>Appetite stimulation in conditions causing wasting</li>
        <li>Alzheimer's disease symptoms</li>
        <li>Autoimmune disorders</li>
      </ul>
      
      <h3>Medical Cannabis Considerations</h3>
      <p>If you're considering medical cannabis:</p>
      <ol>
        <li>Consult healthcare providers knowledgeable about cannabis medicine</li>
        <li>Understand the legal status in your jurisdiction</li>
        <li>Start with low doses and increase gradually</li>
        <li>Consider CBD-dominant options for those concerned about intoxication</li>
        <li>Be aware of potential drug interactions with other medications</li>
      </ol>
      
      <p>As research continues to evolve, our understanding of cannabis's medical applications will undoubtedly expand, potentially offering new treatment options for a wide range of conditions.</p>
    `,
    image: blog3,
    category: 'Medical',
    date: 'July 28, 2023',
    readTime: 8,
    author: {
      name: 'Dr. Sarah Williams',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
      bio: 'Dr. Williams is a physician specializing in integrative medicine with a focus on cannabinoid therapeutics.'
    }
  },
  {
    id: 4,
    title: 'Cannabis and Wellness: Incorporating CBD into Your Daily Routine',
    slug: 'cannabis-and-wellness',
    excerpt: 'Discover how CBD products can enhance your wellness routine, from sleep improvement to stress reduction.',
    content: `<p>Coming soon...</p>`,
    image: blog4,
    category: 'Wellness',
    date: 'August 12, 2023',
    readTime: 6,
    author: {
      name: 'Emma Thompson',
      avatar: 'https://randomuser.me/api/portraits/women/24.jpg',
      bio: 'Emma is a wellness coach specializing in holistic approaches to health, including the use of plant medicines.'
    }
  },
  {
    id: 5,
    title: 'The History of Cannabis: From Ancient Times to Modern Day',
    slug: 'history-of-cannabis',
    excerpt: 'Take a journey through time and discover the fascinating history of cannabis use across different cultures and eras.',
    content: `<p>Coming soon...</p>`,
    image: blog5,
    category: 'Culture',
    date: 'September 5, 2023',
    readTime: 10,
    author: {
      name: 'Prof. Robert Chen',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      bio: 'Professor Chen is a historian specializing in the cultural significance of plants throughout human civilization.'
    }
  },
  {
    id: 6,
    title: 'Cannabis Legalization: Current Status and Future Outlook',
    slug: 'cannabis-legalization',
    excerpt: 'Get updated on the current legal status of cannabis around the world and what the future might hold for legalization efforts.',
    content: `<p>Coming soon...</p>`,
    image: blog6,
    category: 'Legal',
    date: 'October 21, 2023',
    readTime: 7,
    author: {
      name: 'Alexandra Davis',
      avatar: 'https://randomuser.me/api/portraits/women/48.jpg',
      bio: 'Alexandra is a legal analyst focusing on cannabis policy and regulation across different jurisdictions.'
    }
  }
];

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find((post) => post.slug === slug);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // If post doesn't exist, redirect to blog page
    if (!post) {
      navigate("/blog");
    }
  }, [post, navigate]);
  
  if (!post) return null;
  
  return (
    <motion.div 
      className={styles.blogPost}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.container}>
        <motion.div 
          className={styles.hero}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.imageContainer}>
            <img src={post.image} alt={post.title} className={styles.featuredImage} />
          </div>
          <div className={styles.overlay}></div>
          <div className={styles.heroContent}>
            <motion.span 
              className={styles.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {post.category}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {post.title}
            </motion.h1>
            <motion.div 
              className={styles.meta}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className={styles.author}>
                <img src={post.author.avatar} alt={post.author.name} className={styles.avatar} />
                <span>{post.author.name}</span>
              </div>
              <span className={styles.date}>{post.date}</span>
              {post.readTime && <span className={styles.readTime}>{post.readTime} min read</span>}
            </motion.div>
          </div>
        </motion.div>
        
        <div className={styles.content}>
          <motion.div 
            className={styles.mainContent}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></motion.div>
          
          <motion.div 
            className={styles.authorBio}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3>About the Author</h3>
            <div className={styles.bioContent}>
              <img src={post.author.avatar} alt={post.author.name} className={styles.bioAvatar} />
              <div>
                <h4>{post.author.name}</h4>
                <p>{post.author.bio}</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className={styles.navigation}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link to="/blog" className={styles.backToBlogs}>
              <svg 
                width="18" 
                height="12" 
                viewBox="0 0 18 12" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                style={{ transform: "rotate(180deg)" }}
              >
                <path 
                  d="M1 6H17M17 6L12 1M17 6L12 11" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              Back to Blogs
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogPost; 