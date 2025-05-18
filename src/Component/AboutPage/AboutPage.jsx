import React, { useState } from 'react';
import './AboutPage.css';

const AboutPage = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const companyMilestones = [
    { year: 2010, event: 'Company Founding' },
    { year: 2015, event: 'Expanded to Major Nigerian Cities' },
    { year: 2018, event: 'Introduced Comprehensive Digital Services' },
    { year: 2022, event: 'Recognized as Top Real Estate Innovator' }
  ];

  const coreServices = [
    {
      id: 'property-transactions',
      title: 'Property Transactions',
      description: 'Seamless buying and selling of residential and commercial properties across Nigeria.',
      icon: '🏠'
    },
    {
      id: 'land-acquisition',
      title: 'Land Acquisition',
      description: 'Expert guidance in land procurement, verification, and secure transactions.',
      icon: '🌍'
    },
    {
      id: 'legal-documentation',
      title: 'Legal Documentation',
      description: 'Comprehensive support for Certificate of Occupancy, survey plans, and property legalities.',
      icon: '📄'
    },
    {
      id: 'estate-management',
      title: 'Estate Management',
      description: 'Professional management of residential and commercial properties.',
      icon: '🏘️'
    }
  ];

  const teamMembers = [
    {
      name: 'Oluwaseun Bankole',
      role: 'Founder & CEO',
      expertise: 'Real Estate Strategy & Innovation',
      image: '/api/placeholder/400/400'
    },
    {
      name: 'Adebayo Oladipo',
      role: 'Chief Operations Officer',
      expertise: 'Property Development & Transactions',
      image: '/api/placeholder/400/400'
    },
    {
      name: 'Chioma Nwosu',
      role: 'Head of Client Relations',
      expertise: 'Customer Experience & Consultancy',
      image: '/api/placeholder/400/400'
    }
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="sb-section-content">
            <h2>Company Overview</h2>
            <p>
              SB.Orus Nigeria Limited stands at the forefront of Nigeria's real estate landscape, 
              delivering innovative and comprehensive property solutions. With a decade of 
              expertise, we've transformed how individuals and businesses approach real estate 
              transactions, management, and development.
            </p>
            <p>
              Our mission is to provide transparent, efficient, and value-driven real estate 
              services that empower our clients to make informed decisions and achieve their 
              property goals.
            </p>
          </div>
        );
      case 'mission':
        return (
          <div className="sb-section-content">
            <h2>Our Mission</h2>
            <p>
              To revolutionize the Nigerian real estate market by delivering unparalleled 
              service, leveraging cutting-edge technology, and maintaining the highest 
              standards of professionalism and integrity.
            </p>
            <div className="sb-mission-values">
              <div className="sb-value-item">
                <h3>Transparency</h3>
                <p>Complete openness in all our transactions and processes.</p>
              </div>
              <div className="sb-value-item">
                <h3>Innovation</h3>
                <p>Continuously evolving to meet the dynamic real estate landscape.</p>
              </div>
              <div className="sb-value-item">
                <h3>Client-Centricity</h3>
                <p>Putting our clients' needs and goals at the center of everything we do.</p>
              </div>
            </div>
          </div>
        );
      case 'achievements':
        return (
          <div className="sb-section-content">
            <h2>Our Journey & Milestones</h2>
            <div className="sb-milestones-timeline">
              {companyMilestones.map((milestone, index) => (
                <div key={index} className="sb-milestone-item">
                  <div className="sb-milestone-year">{milestone.year}</div>
                  <div className="sb-milestone-event">{milestone.event}</div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="sb-about-page">
      <section className="sb-hero-section">
        <div className="sb-hero-content">
          <h1>SB.Orus Nigeria Limited</h1>
          <p>Transforming Real Estate Experiences Across Nigeria</p>
        </div>
      </section>

      <section className="sb-company-navigation">
        <div className="sb-nav-buttons">
          {['overview', 'mission', 'achievements'].map((section) => (
            <button
              key={section}
              className={`sb-nav-button ${activeSection === section ? 'active' : ''}`}
              onClick={() => setActiveSection(section)}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </div>
        {renderActiveSection()}
      </section>

      <section className="sb-services-section">
        <h2>Our Core Services</h2>
        <div className="sb-services-grid">
          {coreServices.map((service) => (
            <div key={service.id} className="sb-service-card">
              <span className="sb-service-icon">{service.icon}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="sb-team-section">
        <h2>Our Leadership Team</h2>
        <div className="sb-team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="sb-team-member">
              <div className="sb-member-image">
                <img src={member.image} alt={member.name} />
              </div>
              <div className="sb-member-details">
                <h3>{member.name}</h3>
                <p className="sb-member-role">{member.role}</p>
                <p className="sb-member-expertise">{member.expertise}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="sb-cta-section">
        <div className="sb-cta-content">
          <h2>Ready to Explore Your Real Estate Potential?</h2>
          <p>Connect with SB.Orus and unlock exceptional property solutions.</p>
          <button className="sb-cta-button">Contact Our Experts</button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;