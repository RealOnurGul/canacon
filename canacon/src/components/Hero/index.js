import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import * as THREE from 'three';
import styles from './Hero.module.css';

const Hero = () => {
  console.log("Hero component rendering");
  const [isLoaded, setIsLoaded] = useState(true);
  const [isVisible, setIsVisible] = useState({
    headerLine: false,
    headingLine1: false,
    headingLine2: false,
    headingLine3: false,
    description: false,
    action: false,
    stats: false
  });
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    console.log("Setting force visibility timeout");
    const forceVisibilityTimeout = setTimeout(() => {
      console.log("Force visibility triggered");
      setIsVisible({
        headerLine: true,
        headingLine1: true,
        headingLine2: true,
        headingLine3: true,
        description: true,
        action: true,
        stats: true
      });
    }, 2000);
    
    return () => clearTimeout(forceVisibilityTimeout);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
      
      const timeouts = [
        setTimeout(() => setIsVisible(prev => ({ ...prev, headerLine: true })), 200),
        setTimeout(() => setIsVisible(prev => ({ ...prev, headingLine1: true })), 400),
        setTimeout(() => setIsVisible(prev => ({ ...prev, headingLine2: true })), 500),
        setTimeout(() => setIsVisible(prev => ({ ...prev, headingLine3: true })), 600),
        setTimeout(() => setIsVisible(prev => ({ ...prev, description: true })), 700),
        setTimeout(() => setIsVisible(prev => ({ ...prev, action: true })), 800),
        setTimeout(() => setIsVisible(prev => ({ ...prev, stats: true })), 900)
      ];
      
      return () => timeouts.forEach(timeout => clearTimeout(timeout));
    }, 100);
    
    if (canvasRef.current && !sceneRef.current) {
      initScene();
    }

    return () => {
      if (sceneRef.current) {
        window.cancelAnimationFrame(sceneRef.current.animationId);
        if (sceneRef.current.renderer) {
          sceneRef.current.renderer.dispose();
        }
        sceneRef.current = null;
      }
    };
  }, []);

  const initScene = () => {
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
      camera.position.z = 5;
      
      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      
      const geometry = new THREE.IcosahedronGeometry(2.2);
      const edges = new THREE.EdgesGeometry(geometry);
      const material = new THREE.LineBasicMaterial({ 
        color: 0xdc2626,
        linewidth: 1
      });
      const wireframe = new THREE.LineSegments(edges, material);
      wireframe.position.x = 2.0;
      wireframe.position.y = 0;
      scene.add(wireframe);

      const handleResize = () => {
        if (!canvas) return;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      };
      
      window.addEventListener('resize', handleResize);
      
      const animate = () => {
        if (wireframe) {
          wireframe.rotation.x += 0.001;
          wireframe.rotation.y += 0.001;
          wireframe.rotation.z += 0.0005;
        }
        
        renderer.render(scene, camera);
        if (sceneRef.current) {
          sceneRef.current.animationId = window.requestAnimationFrame(animate);
        }
      };
      
      sceneRef.current = {
        scene,
        camera,
        renderer,
        wireframe,
        animationId: null,
        dispose: () => {
          window.removeEventListener('resize', handleResize);
          if (sceneRef.current && sceneRef.current.animationId) {
            window.cancelAnimationFrame(sceneRef.current.animationId);
          }
          renderer.dispose();
          geometry.dispose();
          material.dispose();
          if (wireframe.geometry) wireframe.geometry.dispose();
        }
      };
      
      animate();
    } catch (error) {
      console.error("Error initializing 3D scene:", error);
      setIsLoaded(true);
    }
  };

  return (
    <section className={styles.hero}>
      <canvas ref={canvasRef} className={styles.canvas3d}></canvas>
      
      <div className={styles.contentWrapper}>
        <div className={`${styles.contentContainer} ${isLoaded ? styles.loaded : ''}`}>
          <div className={`${styles.headerLine} ${isVisible.headerLine ? styles.visible : ''}`}>
            <span className={styles.headerTag}>DIGITAL AGENCY</span>
          </div>
          
          <h1 className={styles.mainHeading}>
            <span className={`${styles.headingLine} ${isVisible.headingLine1 ? styles.visible : ''}`}>
              <span className={styles.headingText}>CANACON MEDIA</span>
            </span>
          </h1>
          
          <div className={`${styles.descriptionContainer} ${isVisible.description ? styles.visible : ''}`}>
            <p className={styles.description}>
              Your partner for digital growth. We provide customized strategies and solutions to help your business thrive in the digital landscape.
            </p>
          </div>
          
          <div className={`${styles.actionContainer} ${isVisible.action ? styles.visible : ''}`}>
            <Link to="/contact" className={styles.primaryButton}>
              <div className={styles.buttonBg}></div>
              <span className={styles.buttonText}>Get Started</span>
              <FaArrowRight className={styles.buttonIcon} />
            </Link>
            <a href="#services" className={styles.secondaryButton}>
              Our Services
            </a>
          </div>
          
          <div className={`${styles.statsContainer} ${isVisible.stats ? styles.visible : ''}`}>
            <div className={styles.statItem}>
              <div className={styles.statValue}>
                <span className={styles.statValueInner}>150</span>
                <span className={styles.statSymbol}>+</span>
              </div>
              <div className={styles.statLabel}>Clients</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>
                <span className={styles.statValueInner}>300</span>
                <span className={styles.statSymbol}>+</span>
              </div>
              <div className={styles.statLabel}>Projects</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>
                <span className={styles.statValueInner}>98</span>
                <span className={styles.statSymbol}>%</span>
              </div>
              <div className={styles.statLabel}>Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 