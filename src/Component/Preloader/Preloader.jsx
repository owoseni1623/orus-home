import React, { useState, useEffect, useRef } from 'react';
import './Preloader.css';
import logo from '../../../public/Images/orus.jpg';

const Preloader = ({ onLoaded }) => {
    const [progress, setProgress] = useState(0);
    const particlesRef = useRef(null);
    const canvasRef = useRef(null);
    
    // Handle particles animation
    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      let particles = [];
      let animationFrameId;
      
      // Set canvas dimensions
      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      
      window.addEventListener('resize', handleResize);
      handleResize();
      
      class Particle {
        constructor() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.size = Math.random() * 3 + 1;
          this.speedX = Math.random() * 3 - 1.5;
          this.speedY = Math.random() * 3 - 1.5;
        }
        
        update() {
          this.x += this.speedX;
          this.y += this.speedY;
          
          if (this.x > canvas.width || this.x < 0) {
            this.speedX = -this.speedX;
          }
          
          if (this.y > canvas.height || this.y <0) {
            this.speedY = -this.speedY;
          }
        }
        
        draw() {
          ctx.fillStyle = `rgba(255, 255, 255, ${progress / 200})`;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.closePath();
          ctx.fill();
        }
      }
      
      const createParticles = () => {
        particles = [];
        const particleCount = Math.floor(canvas.width * canvas.height / 10000);
        for (let i = 0; i < particleCount; i++) {
          particles.push(new Particle());
        }
      };
      
      const connectParticles = () => {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j <particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance <100) {
              const opacity = (100 - distance) / 100 * (progress / 150);
              ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      };
      
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
          particle.update();
          particle.draw();
        });
        connectParticles();
        animationFrameId = requestAnimationFrame(animate);
      };
      
      createParticles();
      animate();
      
      return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrameId);
      };
    }, [progress]);
    
    // Handle progress animation
    useEffect(() => {
      const timer = setTimeout(() => {
        if (progress < 100) {
          setProgress(prev => prev + 1);
        } else {
          setTimeout(() => onLoaded(), 800); // Longer delay for smooth transition
        }
      }, 25);
      
      return () => clearTimeout(timer);
    }, [progress, onLoaded]);
    
    return (
      <div className="preloader">
        <canvas ref={canvasRef} className="particles-canvas"></canvas>
        <div className="preloader-content">
          <div className="circular-loader">
            <div className="outer-ring"></div>
            <div className="inner-ring" style={{ transform: `rotate(${progress * 3.6}deg)` }}>
              <div className="progress-indicator"></div>
            </div>
            <div className="middle-ring">
              <svg className="ring-svg" viewBox="0 0 100 100">
                <circle
                  className="ring-circle"
                  cx="50"
                  cy="50"
                  r="45"
                  strokeDasharray="283"
                  strokeDashoffset={283 - (progress / 100 * 283)}
                />
              </svg>
            </div>
            <div className="logo-container">
              <div className="logo-glow"></div>
              <img src={logo} alt="App Logo" className="preloader-logo" />
            </div>
            <div className="progress-text">
              <span className="progress-value">{progress}</span>
              <span className="progress-symbol">%</span>
            </div>
          </div>
          <div className="loading-message">Initializing your experience...</div>
        </div>
      </div>
    );
  };
  
  export default Preloader;