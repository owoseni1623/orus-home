import React, { useState, useRef, useEffect } from 'react';
import './TermsOfServicePage.css';

const TermsOfServicePage = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentRef = useRef(null);

  const termsSection = [
    {
      title: "Acceptance of Terms",
      content: "By accessing and using SB.Orus Nigeria Limited's services, you agree to be bound by these Terms of Service. These terms constitute a legally binding agreement between you and our company.",
      keyPoints: [
        "Mandatory for all service users",
        "Governs interactions with our platform",
        "Subject to periodic updates"
      ]
    },
    {
      title: "Service Description",
      content: "SB.Orus Nigeria Limited provides comprehensive real estate services including property buying, selling, land transactions, C of O processing, survey plans, and estate management.",
      keyPoints: [
        "Diverse real estate solutions",
        "Professional and reliable services",
        "Customized property solutions"
      ]
    },
    {
      title: "User Obligations",
      content: "Users are required to provide accurate information, maintain confidentiality, and comply with all legal and ethical standards when using our services.",
      keyPoints: [
        "Accurate personal information",
        "Respect for legal procedures",
        "Ethical conduct"
      ]
    },
    {
      title: "Financial Terms",
      content: "All financial transactions are subject to transparent pricing, clear fee structures, and agreed-upon payment terms. We reserve the right to modify pricing with prior notice.",
      keyPoints: [
        "Transparent pricing",
        "Clear fee communication",
        "Flexible payment options"
      ]
    },
    {
      title: "Intellectual Property",
      content: "All content, logos, and materials on our platform are the exclusive property of SB.Orus Nigeria Limited and protected by intellectual property laws.",
      keyPoints: [
        "Proprietary content protection",
        "Copyright preservation",
        "Restricted usage rights"
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

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  return (
    <div className="terms-of-service-page">
      <div className="scroll-progress-bar" style={{width: `${scrollProgress}%`}}></div>
      
      <div className="terms-container">
        <header className="terms-header">
          <div className="header-overlay"></div>
          <h1>Terms of Service</h1>
          <p>SB.Orus Nigeria Limited</p>
        </header>

        <div className="terms-content" ref={contentRef}>
          <div className="intro-section">
            <h2>Welcome to SB.Orus Nigeria Limited</h2>
            <p>Our commitment to transparency, professionalism, and legal compliance is reflected in these comprehensive Terms of Service.</p>
          </div>

          <div className="terms-sections">
            {termsSection.map((section, index) => (
              <div 
                key={index} 
                className={`terms-section ${activeSection === index ? 'expanded' : ''}`}
              >
                <div 
                  className="section-header" 
                  onClick={() => toggleSection(index)}
                >
                  <h3>{section.title}</h3>
                  <div className="section-toggle">
                    {activeSection === index ? '−' : '+'}
                  </div>
                </div>

                {activeSection === index && (
                  <div className="section-content">
                    <p>{section.content}</p>
                    <div className="key-points">
                      <h4>Key Highlights</h4>
                      <ul>
                        {section.keyPoints.map((point, idx) => (
                          <li key={idx}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="legal-disclaimer">
            <h3>Legal Disclaimer</h3>
            <p>These Terms of Service are governed by the laws of the Federal Republic of Nigeria. Any disputes shall be resolved through appropriate legal channels.</p>
          </div>

          <div className="contact-section">
            <h3>Questions About Our Terms?</h3>
            <div className="contact-details">
              <p><strong>Legal Department</strong></p>
              <p>Email: legal@sborusnigeria.com</p>
              <p>Phone: +234 (0) 123 456 7890</p>
            </div>
          </div>
        </div>

        <footer className="terms-footer">
          <p>© 2025 SB.Orus Nigeria Limited. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default TermsOfServicePage;