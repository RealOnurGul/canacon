import React from "react";
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
import RealEstatePage from "./pages/RealEstate";
import ContactPage from "./pages/Contact";
import CommissionCalculator from "./pages/CommissionCalculator";
import "./styles/global.css";

function App() {
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
        <Route path="/realestate" element={<RealEstatePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/commission-calculator" element={<CommissionCalculator />} />
      </Routes>
      
      <Footer />
    </div>
  );
}

export default App;

