import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
  const { user, isAuthenticated } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Social media links - replace these with the actual social media page URLs for SB.Orus Nigeria Limited
  const socialLinks = {
    facebook: 'https://www.facebook.com/sborusnigeria',
    twitter: 'https://www.twitter.com/sborusnigeria',
    instagram: 'https://www.instagram.com/sborusnigeria',
    linkedin: 'https://www.linkedin.com/company/sborusnigeria'
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerContent}>
          <div className={styles.companyInfo}>
            <h3>SB.Orus Nigeria Limited</h3>
            <p>Transforming Visions into Realities</p>
            <div className={styles.timeDisplay}>
              <p>{currentTime.toLocaleTimeString()}</p>
              <p>{currentTime.toLocaleDateString()}</p>
            </div>
          </div>
          <div className={styles.footerLinks}>
            <div className={styles.linkColumn}>
              <h4>Quick Links</h4>
              <Link to="/services/selling-homes">Selling Homes</Link>
              <Link to="/services/selling-land">Selling Land</Link>
              <Link to="/services/block-industry">Block Industry</Link>
              {isAuthenticated && (user?.role === 'admin' || user?.userType === 'admin') && (
                <>
                  <Link to="/admin/properties">Property Dashboard</Link>
                  <Link to="/admin/surveys">Survey Dashboard</Link>
                  <Link to="/admin/lands">Land Dashboard</Link>
                </>
              )}
            </div>
            <div className={styles.linkColumn}>
              <h4>Services</h4>
              <Link to="/services/survey-documents">Survey Documents</Link>
              <Link to="/services/cofo-processing">C of O Processing</Link>
              <Link to="/services/building-engineering">Building Engineering</Link>
              <Link to="/services/estate-development">Estate Development</Link>
              {isAuthenticated && (user?.role === 'admin' || user?.userType === 'admin') && (
                <>
                  <Link to="/admin/blocks">Manage Blocks</Link>
                  <Link to="/admin/engineering">Engineering Admin</Link>
                </>
              )}
            </div>
            <div className={styles.linkColumn}>
              <h4>Company</h4>
              <Link to="/about">About Us</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/privacy-policy">Privacy Policy</Link>
              <Link to="/terms-of-service">Terms of Service</Link>
              {isAuthenticated && (user?.role === 'admin' || user?.userType === 'admin') && (
                <>
                  <Link to="/admin">Block Dashboard</Link>
                  <Link to="/admin/cofo">COFO Dashboard</Link>
                  <Link to="/admin/investment">Investment Dashboard</Link>
                </>
              )}
            </div>
          </div>
          <div className={styles.contactInfo}>
            <h4>Contact Us</h4>
            <p>Email: info@sborusnigeria.com</p>
            <p>Phone: +234 (0) 123 456 7890</p>
            <p>Address: 123 Real Estate Street, Lagos, Nigeria</p>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <div className={styles.socialLinks}>
            <a 
              href={socialLinks.facebook} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Facebook"
              className={`${styles.facebook}`}
            >
              <FaFacebook />
            </a>
            <a 
              href={socialLinks.twitter} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Twitter"
              className={`${styles.twitter}`}
            >
              <FaTwitter />
            </a>
            <a 
              href={socialLinks.instagram} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Instagram"
              className={`${styles.instagram}`}
            >
              <FaInstagram />
            </a>
            <a 
              href={socialLinks.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn"
              className={`${styles.linkedin}`}
            >
              <FaLinkedin />
            </a>
          </div>
          <p>&copy; {new Date().getFullYear()} SB.Orus Nigeria Limited. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;