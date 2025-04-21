import React from "react";
import { Element } from "react-scroll";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
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
  return (
    <div className="App">
      <Header />
      
      <Routes>
        <Route path="/" element={
          <>
            <Element name="home">
              <Hero />
            </Element>
            
            <Element name="services">
              <Services />
            </Element>
            
            <Element name="realestate">
              <RealEstate />
            </Element>
            
            <Element name="startups">
              <Startups />
            </Element>
            
            <Element name="contact">
              <Contact />
            </Element>
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

