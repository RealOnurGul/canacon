import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/index";
import Hero from "./components/Hero";
import Services from "./components/Services";
import RealEstate from "./components/RealEstate";
import Startups from "./components/Startups";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BlogPage from "./components/BlogPage";
import BlogPost from "./pages/BlogPost";
import "./styles/global.css";

function App() {
  // Generate a particle texture on app load to ensure it's available
  useEffect(() => {
    try {
      console.log("Generating particle texture...");
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 24;
      
      // Draw a radial gradient
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.5, 'rgba(240, 240, 255, 0.5)');
      gradient.addColorStop(1, 'rgba(220, 220, 255, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, false);
      ctx.fill();
      
      // Add a temporary display of the texture to the DOM for debugging
      const img = document.createElement('img');
      img.src = canvas.toDataURL('image/png');
      img.style.position = 'fixed';
      img.style.top = '10px';
      img.style.right = '10px';
      img.style.width = '32px';
      img.style.height = '32px';
      img.style.zIndex = '9999';
      img.style.border = '1px solid white';
      document.body.appendChild(img);
      
      console.log("Particle texture generated!");
    } catch (error) {
      console.error("Failed to generate particle texture:", error);
    }
  }, []);

  return (
    <div className="App">
      <Header />
      
      <Routes>
        <Route path="/" element={
          <>
            <div id="home">
              <Hero />
            </div>
            
            <div id="services">
              <Services />
            </div>
            
            <div id="realestate">
              <RealEstate />
            </div>
            
            <div id="startups">
              <Startups />
            </div>
            
            <div id="contact">
              <Contact />
            </div>
          </>
        } />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
      
      <Footer />
    </div>
  );
}

export default App;

