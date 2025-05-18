import React, { useState, useEffect, useRef } from 'react';
import './PrivacyPolicyPage.css';

const PrivacyPolicyPage = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentRef = useRef(null);

  const privacySections = [
    {
      id: 'information-collection',
      title: 'Information Collection',
      icon: '📋',
      summary: 'Comprehensive details about the data we collect',
      content: `We collect personal information through various channels to provide and improve our real estate services. This includes:
        - Personal contact details
        - Property transaction information
        - Device and technical usage data
        - Communication records
        - Demographic information`,
      details: [
        'Transparent data collection practices',
        'Minimal personal information gathering',
        'Purpose-driven data collection'
      ]
    },
    {
      id: 'data-usage',
      title: 'Data Usage',
      icon: '🔍',
      summary: 'How we process and utilize your personal information',
      content: `Your data is used to:
        - Facilitate real estate transactions
        - Provide personalized services
        - Improve customer experience
        - Comply with legal requirements
        - Ensure platform security`,
      details: [
        'Strict data processing guidelines',
        'User-centric information management',
        'Continuous privacy protection'
      ]
    },
    {
      id: 'data-protection',
      title: 'Data Protection',
      icon: '🔒',
      summary: 'Our commitment to securing your personal information',
      content: `We implement robust security measures:
        - Advanced encryption technologies
        - Regular security audits
        - Access control mechanisms
        - Secure data storage
        - Continuous monitoring systems`,
      details: [
        'State-of-the-art security infrastructure',
        'Proactive threat prevention',
        'Comprehensive risk management'
      ]
    },
    {
      id: 'user-rights',
      title: 'User Rights',
      icon: '✋',
      summary: 'Your rights regarding personal data management',
      content: `You have the right to:
        - Access your personal information
        - Request data correction
        - Demand data deletion
        - Withdraw consent
        - Object to data processing
        - Data portability`,
      details: [
        'Comprehensive user control',
        'Transparent privacy management',
        'Empowering user choices'
      ]
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const totalHeight = contentRef.current.scrollHeight - contentRef.current.clientHeight;
        const progress = (contentRef.current.scrollTop / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    const currentRef = contentRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll);
      return () => currentRef.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const toggleSection = (id) => {
    setActiveSection(activeSection === id ? null : id);
  };

  return (
    <div className="privacy-policy-container">
      <div 
        className="scroll-progress" 
        style={{width: `${scrollProgress}%`}}
      />
      
      <header className="privacy-header">
        <div className="header-content">
          <h1>Privacy Policy</h1>
          <p>SB.Orus Nigeria Limited</p>
        </div>
      </header>

      <div className="privacy-content" ref={contentRef}>
        <section className="intro-section">
          <h2>Your Privacy, Our Priority</h2>
          <p>At SB.Orus Nigeria Limited, we are committed to protecting your personal information with the highest standards of privacy and transparency.</p>
        </section>

        <div className="privacy-sections">
          {privacySections.map((section) => (
            <div 
              key={section.id} 
              className={`privacy-section ${activeSection === section.id ? 'active' : ''}`}
            >
              <div 
                className="section-header"
                onClick={() => toggleSection(section.id)}
              >
                <div className="section-title">
                  <span className="section-icon">{section.icon}</span>
                  <h3>{section.title}</h3>
                </div>
                <div className="section-summary">{section.summary}</div>
                <div className="section-toggle">
                  {activeSection === section.id ? '−' : '+'}
                </div>
              </div>

              {activeSection === section.id && (
                <div className="section-details">
                  <p className="section-content">{section.content}</p>
                  <div className="section-highlights">
                    <h4>Key Highlights</h4>
                    <ul>
                      {section.details.map((detail, index) => (
                        <li key={index}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="contact-section">
          <h3>Questions About Your Privacy?</h3>
          <div className="contact-details">
            <p>Contact our Data Protection Officer</p>
            <div className="contact-info">
              <p>📧 privacy@sborusnigeria.com</p>
              <p>📞 +234 (0) 123 456 7890</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="privacy-footer">
        <p>© 2025 SB.Orus Nigeria Limited. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default PrivacyPolicyPage;