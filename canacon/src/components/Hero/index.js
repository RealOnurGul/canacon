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
      camera.position.z = 15;
      
      const renderer = new THREE.WebGLRenderer({ 
        canvas,
        antialias: true,
        alpha: true
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      
      const particlesGeometry = new THREE.BufferGeometry();
      const count = 1500;
      
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      
      for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 50;
        colors[i] = Math.random();
      }
      
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      
      // Create a texture directly without loading external file
      const createParticleTexture = () => {
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
        
        return new THREE.CanvasTexture(canvas);
      };
      
      const particleTexture = createParticleTexture();
      
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.15,
        sizeAttenuation: true,
        transparent: true,
        alphaMap: particleTexture,
        vertexColors: true
      });
      
      particlesMaterial.depthWrite = false;
      particlesMaterial.blending = THREE.AdditiveBlending;
      
      const particles = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particles);
      
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
        if (particles) {
          particles.rotation.x += 0.0005;
          particles.rotation.y += 0.0005;
        }
        
        renderer.render(scene, camera);
        sceneRef.current.animationId = window.requestAnimationFrame(animate);
      };
      
      sceneRef.current = {
        scene,
        camera,
        renderer,
        particles,
        animationId: null,
        dispose: () => {
          window.removeEventListener('resize', handleResize);
          window.cancelAnimationFrame(sceneRef.current.animationId);
          renderer.dispose();
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
            <span className={styles.headerTag}>CANACON 2024</span>
          </div>
          
          <h1 className={styles.mainHeading}>
            <span className={`${styles.headingLine} ${isVisible.headingLine1 ? styles.visible : ''}`}>
              <span className={styles.headingText} style={{color: '#ffffff'}}>The Leading Digital</span>
            </span>
            <span className={`${styles.headingLine} ${isVisible.headingLine2 ? styles.visible : ''}`}>
              <span className={styles.headingText} style={{color: '#ffffff'}}>Marketing Conference</span>
            </span>
            <span className={`${styles.headingLine} ${isVisible.headingLine3 ? styles.visible : ''}`}>
              <span className={styles.headingText} style={{color: '#ffffff'}}>for Creators</span>
            </span>
          </h1>
          
          <div className={`${styles.descriptionContainer} ${isVisible.description ? styles.visible : ''}`}>
            <p className={styles.description} style={{color: 'rgba(255, 255, 255, 0.8)'}}>
              Join thousands of digital marketers, content creators, and industry experts for three days of insights, networking, and inspiration.
            </p>
          </div>
          
          <div className={`${styles.actionContainer} ${isVisible.action ? styles.visible : ''}`}>
            <Link to="/tickets" className={styles.primaryButton}>
              <div className={styles.buttonBg}></div>
              <span className={styles.buttonText} style={{color: '#ffffff'}}>Get Your Tickets</span>
              <FaArrowRight className={styles.buttonIcon} />
            </Link>
            <Link to="/schedule" className={styles.secondaryButton} style={{color: '#ffffff'}}>
              View Schedule
            </Link>
          </div>
          
          <div className={`${styles.statsContainer} ${isVisible.stats ? styles.visible : ''}`}>
            <div className={styles.statItem}>
              <div className={styles.statValue}>
                <span className={styles.statValueInner} style={{color: '#ffffff'}}>3K</span>
                <span className={styles.statSymbol} style={{color: '#7209b7'}}>+</span>
              </div>
              <div className={styles.statLabel} style={{color: 'rgba(255, 255, 255, 0.6)'}}>Attendees</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>
                <span className={styles.statValueInner} style={{color: '#ffffff'}}>50</span>
                <span className={styles.statSymbol} style={{color: '#7209b7'}}>+</span>
              </div>
              <div className={styles.statLabel} style={{color: 'rgba(255, 255, 255, 0.6)'}}>Speakers</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>
                <span className={styles.statValueInner} style={{color: '#ffffff'}}>30</span>
                <span className={styles.statSymbol} style={{color: '#7209b7'}}>+</span>
              </div>
              <div className={styles.statLabel} style={{color: 'rgba(255, 255, 255, 0.6)'}}>Workshops</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollIcon}>
          <div className={styles.scrollDot}></div>
        </div>
        <div className={styles.scrollText}>SCROLL DOWN</div>
      </div>
    </section>
  );
};

export default Hero; 