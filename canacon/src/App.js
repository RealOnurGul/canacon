import React from 'react';
import { Element } from 'react-scroll';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import HorizontalScroll from './components/HorizontalScroll';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './styles/global.css';

function App() {
  return (
    <div className="App">
      <Header />
      
      <Element name="home">
        <Hero />
      </Element>
      
      <Element name="about">
        <About />
      </Element>
      
      <Element name="services">
        <Services />
      </Element>
      
      <Element name="horizontal-scroll">
        <HorizontalScroll />
      </Element>
      
      <Element name="portfolio">
        <Portfolio />
      </Element>
      
      <Element name="contact">
        <Contact />
      </Element>
      
      <Footer />
    </div>
  );
}

export default App;
