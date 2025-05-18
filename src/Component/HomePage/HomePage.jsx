import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeCard, setActiveCard] = useState(null);
  const carouselRef = useRef(null);

  // Carousel Images (high-quality real estate images)
  const carouselImages = [
    '/Images/orus00.jpeg',
    '/Images/orus1.jpeg', 
    '/Images/orus001.jpeg',
    '/Images/orus01.jpg',
    '/Images/orus1.png',
    '/Images/orus2.jpeg'
  ];

  const serviceCategories = [
    {
      id: 'selling-homes',
      title: 'Selling of Homes',
      description: 'Discover your dream property with expert guidance and comprehensive real estate solutions.',
      icon: '🏠',
      background: 'linear-gradient(135deg, #ff6b6b, #4ecdc4)',
      route: '/services/selling-homes'
    },
    {
      id: 'selling-land',
      title: 'Selling of Land',
      description: 'Prime land opportunities for strategic investments and development projects.',
      icon: '🌄',
      background: 'linear-gradient(135deg, #5f27cd, #48dbfb)',
      route: '/services/selling-land'
    },
    {
      id: 'block-industry',
      title: 'Block Industry',
      description: 'High-quality construction materials engineered for durability and performance.',
      icon: '🧱',
      background: 'linear-gradient(135deg, #ff9ff3, #54a0ff)',
      route: '/services/block-industry'
    },
    {
      id: 'survey-documents',
      title: 'Survey Documents',
      description: 'Precise and legally compliant land survey documentation services.',
      icon: '📋',
      background: 'linear-gradient(135deg, #feca57, #48dbfb)',
      route: '/services/survey-documents'
    },
    {
      id: 'cofo-processing',
      title: 'C of O Processing',
      description: 'Streamlined Certificate of Occupancy processing with expert legal support.',
      icon: '📝',
      background: 'linear-gradient(135deg, #10ac84, #1dd1a1)',
      route: '/services/cofo-processing'
    },
    {
      id: 'building-engineering',
      title: 'Building Engineering',
      description: 'Advanced engineering solutions for complex construction and architectural challenges.',
      icon: '🏗️',
      background: 'linear-gradient(135deg, #5f27cd, #ff6b6b)',
      route: '/services/building-engineering'
    },
    {
      id: 'estate-developer',
      title: 'Estate Development',
      description: 'Creating sustainable, innovative communities with visionary urban planning.',
      icon: '🌆',
      background: 'linear-gradient(135deg, #ff9ff3, #54a0ff)',
      route: '/services/estate-development'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    <div className={styles.homepage}>
      <div className={styles.carouselContainer}>
        <div 
          className={styles.carousel}
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {carouselImages.map((image, index) => (
            <div key={index} className={styles.carouselSlide}>
              <img src={image} alt={`Real Estate Slide ${index + 1}`} />
            </div>
          ))}
        </div>
        <div className={styles.carouselOverlay}>
          <div className={styles.overlayContent}>
            <h1>SB.Orus Nigeria Limited</h1>
            <p>Transforming Visions into Realities</p>
            <button onClick={() => navigate('/contact')}>Get Started</button>
          </div>
        </div>
        <div className={styles.carouselDots}>
          {carouselImages.map((_, index) => (
            <span 
              key={index} 
              className={`${styles.dot} ${currentSlide === index ? styles.activeDot : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>

      <main className={styles.mainContent}>
        <section className={styles.serviceSection}>
          <h2>Our Comprehensive Services</h2>
          <div className={styles.serviceGrid}>
            {serviceCategories.map((service) => (
              <div 
                key={service.id}
                className={`
                  ${styles.serviceCard} 
                  ${activeCard === service.id ? styles.activeCard : ''}
                `}
                style={{ background: service.background }}
                onMouseEnter={() => setActiveCard(service.id)}
                onMouseLeave={() => setActiveCard(null)}
                onClick={() => handleCardClick(service.route)}
              >
                <div className={styles.serviceIcon}>{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className={styles.serviceOverlay}>
                  <span>Explore Service</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.whyChooseUs}>
          <h2>Why Choose SB.Orus?</h2>
          <div className={styles.featureGrid}>
            {[
              { icon: '🌟', title: 'Expertise', description: 'Years of experience in real estate and development' },
              { icon: '🤝', title: 'Trust', description: 'Transparent, ethical, and client-focused approach' },
              { icon: '🏆', title: 'Quality', description: 'Commitment to excellence in every project' },
              { icon: '🌍', title: 'Innovation', description: 'Cutting-edge solutions for modern challenges' }
            ].map((feature, index) => (
              <div key={index} className={styles.feature}>
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.callToAction}>
          <h2>Ready to Transform Your Property Vision?</h2>
          <p>Connect with our experts and start your journey today</p>
          <button onClick={() => navigate('/contact')}>Contact Us</button>
        </section>
      </main>
    </div>
  );
};

export default HomePage;