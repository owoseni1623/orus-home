import React, { useState, useRef, useEffect } from 'react';
import './ContactUsPage.css';

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const formRef = useRef(null);

  const services = [
    { 
      id: 'home-sale', 
      name: 'Buy/Sell Homes', 
      icon: '🏠'
    },
    { 
      id: 'land-transaction', 
      name: 'Buy/Sell Land', 
      icon: '🌍'
    },
    { 
      id: 'co-process', 
      name: 'C of O Process', 
      icon: '📄'
    },
    { 
      id: 'survey-plan', 
      name: 'Survey Plan', 
      icon: '🗺️'
    },
    { 
      id: 'building-engineering', 
      name: 'Building Engineering', 
      icon: '🏗️'
    },
    { 
      id: 'estate-management', 
      name: 'Estate Management', 
      icon: '🏘️'
    }
  ];

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,14}$/;

    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      errors.phone = 'Invalid phone number';
    }
    if (!formData.service) errors.service = 'Please select a service';
    if (!formData.message.trim()) errors.message = 'Message is required';

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    
    // Simulated form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      
      // Reset form after success
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);
    }, 1500);
  };

  const renderErrorMessage = (field) => {
    return formErrors[field] && (
      <span className="error-message">{formErrors[field]}</span>
    );
  };

  return (
    <div className="ultra-contact-page">
      <div className="contact-container">
        <div className="contact-info-section">
          <div className="company-details">
            <h1>SB.Orus Nigeria Limited</h1>
            <p>Your Trusted Real Estate Partner</p>
          </div>

          <div className="contact-methods">
            <div className="contact-method">
              <div className="contact-icon">📍</div>
              <div className="contact-text">
                <h4>Address</h4>
                <p>123 Real Estate Street, Lagos, Nigeria</p>
              </div>
            </div>

            <div className="contact-method">
              <div className="contact-icon">📞</div>
              <div className="contact-text">
                <h4>Phone</h4>
                <p>+234 (0) 123 456 7890</p>
              </div>
            </div>

            <div className="contact-method">
              <div className="contact-icon">✉️</div>
              <div className="contact-text">
                <h4>Email</h4>
                <p>info@sborusnigeria.com</p>
              </div>
            </div>
          </div>

          <div className="service-highlights">
            <h3>Our Services</h3>
            <div className="service-grid">
              {services.map((service) => (
                <div key={service.id} className="service-item">
                  <span className="service-icon">{service.icon}</span>
                  <span className="service-name">{service.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="contact-form-section">
          <form 
            ref={formRef} 
            onSubmit={handleSubmit} 
            className={`contact-form ${isSubmitting ? 'submitting' : ''}`}
          >
            <h2>Get In Touch</h2>
            <p>Have a question? We'd love to hear from you.</p>

            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input 
                type="text" 
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={formErrors.name ? 'error' : ''}
                placeholder="Your Full Name"
              />
              {renderErrorMessage('name')}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={formErrors.email ? 'error' : ''}
                placeholder="your.email@example.com"
              />
              {renderErrorMessage('email')}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input 
                type="tel" 
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={formErrors.phone ? 'error' : ''}
                placeholder="+234 123 456 7890"
              />
              {renderErrorMessage('phone')}
            </div>

            <div className="form-group">
              <label htmlFor="service">Interested Service</label>
              <select 
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className={formErrors.service ? 'error' : ''}
              >
                <option value="">Select a Service</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
              {renderErrorMessage('service')}
            </div>

            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea 
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={formErrors.message ? 'error' : ''}
                placeholder="Write your message here..."
                rows="4"
              ></textarea>
              {renderErrorMessage('message')}
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>

            {submitStatus === 'success' && (
              <div className="success-message">
                Thank you! We'll get back to you soon.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;