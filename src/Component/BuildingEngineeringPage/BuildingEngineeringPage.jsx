import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './BuildingEngineeringPage.css';

// Advanced Engineering Services Data
const engineeringServices = [
  {
    id: 1,
    title: "Structural Design & Analysis",
    icon: "🏗️",
    shortDescription: "Precision Engineering for Robust Structures",
    detailedDescription: [
      "Advanced 3D structural modeling",
      "Comprehensive load and stress analysis",
      "Seismic and wind resistance optimization",
      "Material performance simulation"
    ],
    technologies: [
      "AutoCAD",
      "STAAD.Pro",
      "SAP2000",
      "Finite Element Analysis"
    ]
  },
  {
    id: 2,
    title: "Sustainable Building Solutions",
    icon: "🌿",
    shortDescription: "Eco-Friendly Engineering Innovations",
    detailedDescription: [
      "Green building certification consulting",
      "Energy efficiency optimization",
      "Renewable energy system integration",
      "Carbon footprint reduction strategies"
    ],
    technologies: [
      "Green Building Standards",
      "Energy Modeling Software",
      "Sustainability Metrics Tools",
      "Climate Response Design"
    ]
  },
  {
    id: 3,
    title: "Advanced Materials Engineering",
    icon: "🔬",
    shortDescription: "Cutting-Edge Material Innovation",
    detailedDescription: [
      "Composite material development",
      "Nanotechnology in construction",
      "Smart material integration",
      "Durability and performance testing"
    ],
    technologies: [
      "Nano-Engineering Tools",
      "Material Stress Testing",
      "Spectroscopic Analysis",
      "Computational Materials Science"
    ]
  },
  {
    id: 4,
    title: "Digital Twin & BIM Technology",
    icon: "💻",
    shortDescription: "Intelligent Building Simulation",
    detailedDescription: [
      "Full Building Information Modeling",
      "Real-time performance prediction",
      "Lifecycle management simulation",
      "Predictive maintenance systems"
    ],
    technologies: [
      "Revit",
      "Navisworks",
      "BIM 360",
      "Digital Twin Platforms"
    ]
  }
];

const projectCaseStudies = [
  {
    id: 1,
    title: "Eco-Friendly Corporate Headquarters",
    location: "Lagos, Nigeria",
    challenge: "Create a zero-carbon commercial building",
    solution: "Integrated solar design, advanced thermal insulation, and smart energy management",
    impact: "90% reduction in energy consumption",
    image: "/Images/oru0.jpg"
  },
  {
    id: 2,
    title: "Resilient Coastal Residential Complex",
    location: "Port Harcourt, Nigeria",
    challenge: "Design tsunami and flood-resistant housing",
    solution: "Elevated structural design, adaptive foundation, and water-resistant materials",
    impact: "100-year flood protection",
    image: "/Images/oruuu.jpg"
  }
];

const expertTeam = [
  {
    name: "Dr. Chidi Okonkwo",
    role: "Chief Structural Engineer",
    expertise: "Advanced Structural Design",
    qualifications: "PhD, Structural Engineering",
    image: "/Images/orus06.jpg"
  },
  {
    name: "Eng. Amina Ibrahim",
    role: "Sustainability Expert",
    expertise: "Green Building Technologies",
    qualifications: "MSc, Environmental Engineering",
    image: "/Images/orus000.jpg"
  }
];

const projectRequirements = [
  {
    category: "Structural Analysis",
    options: [
      "Complete structural assessment of existing building",
      "Seismic resistance evaluation and upgrade recommendations",
      "Foundation analysis and reinforcement planning",
      "Load-bearing capacity enhancement study"
    ]
  },
  {
    category: "Sustainability Solutions",
    options: [
      "Green building certification consulting and implementation",
      "Energy efficiency audit and optimization plan",
      "Renewable energy system integration assessment",
      "Sustainable materials selection and implementation"
    ]
  },
  {
    category: "Building Systems",
    options: [
      "HVAC system optimization and upgrade planning",
      "Electrical systems modernization assessment",
      "Plumbing and water management systems evaluation",
      "Smart building technology integration plan"
    ]
  },
  {
    category: "Safety & Compliance",
    options: [
      "Building code compliance assessment and updates",
      "Fire safety systems evaluation and enhancement",
      "Accessibility requirements implementation plan",
      "Emergency systems upgrade consultation"
    ]
  }
];

const BuildingEngineeringPage = () => {
  const [activeService, setActiveService] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    requirementCategory: '',
    specificRequirement: '',
    description: ''
  });

  const servicesRef = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [submitStatus, setSubmitStatus] = useState({ loading: false, error: null });

  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };
  

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ loading: true, error: null });
  
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('projectType', formData.projectType);
      // Combine requirement category and specific requirement for description
      const description = `Category: ${formData.requirementCategory}\nRequirement: ${formData.specificRequirement}`;
      formDataToSend.append('description', description);
      
      selectedFiles.forEach(file => {
        formDataToSend.append('images', file);
      });
  
      const response = await axios.post('/api/engineering/submit', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      if (response.data.success) {
        alert('Engineering Consultation Request Submitted Successfully!');
        setFormData({
          name: '',
          email: '',
          projectType: '',
          requirementCategory: '',
          specificRequirement: '',
          description: ''
        });
        setSelectedFiles([]);
      }
    } catch (error) {
      setSubmitStatus({
        loading: false,
        error: error.response?.data?.message || 'Error submitting consultation request'
      });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (servicesRef.current) {
      observer.observe(servicesRef.current);
    }

    return () => {
      if (servicesRef.current) {
        observer.unobserve(servicesRef.current);
      }
    };
  }, []);

  const handleServiceClick = (serviceId) => {
    setActiveService(activeService === serviceId ? null : serviceId);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="building-engineering-page">
      <header className="engineering-header">
        <div className="header-content">
          <h1>SB.Orus Building Engineering</h1>
          <p>Innovative Solutions | Transformative Design | Sustainable Future</p>
        </div>
      </header>

      <section className="engineering-services-section" ref={servicesRef}>
        <h2>Our Engineering Expertise</h2>
        <div className={`services-grid ${isIntersecting ? 'services-animated' : ''}`}>
          {engineeringServices.map(service => (
            <div 
              key={service.id} 
              className={`service-card ${activeService === service.id ? 'service-active' : ''}`}
              onClick={() => handleServiceClick(service.id)}
            >
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p className="service-short-description">{service.shortDescription}</p>
              {activeService === service.id && (
                <div className="service-details">
                  <ul>
                    {service.detailedDescription.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                  <div className="service-technologies">
                    <strong>Key Technologies:</strong>
                    <div className="tech-tags">
                      {service.technologies.map((tech, index) => (
                        <span key={index} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="case-studies-section">
        <h2>Transformative Project Case Studies</h2>
        <div className="case-studies-grid">
          {projectCaseStudies.map(study => (
            <div key={study.id} className="case-study-card">
              <div className="case-study-image">
                <img src={study.image} alt={study.title} />
              </div>
              <div className="case-study-details">
                <h3>{study.title}</h3>
                <p><strong>Location:</strong> {study.location}</p>
                <p><strong>Challenge:</strong> {study.challenge}</p>
                <p><strong>Solution:</strong> {study.solution}</p>
                <p className="case-study-impact">
                  <strong>Impact:</strong> {study.impact}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="expert-team-section">
        <h2>Our Engineering Visionaries</h2>
        <div className="expert-team-grid">
          {expertTeam.map((expert, index) => (
            <div key={index} className="expert-card">
              <div className="expert-image">
                <img src={expert.image} alt={expert.name} />
              </div>
              <div className="expert-details">
                <h3>{expert.name}</h3>
                <p className="expert-role">{expert.role}</p>
                <p className="expert-expertise">{expert.expertise}</p>
                <p className="expert-qualifications">{expert.qualifications}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="engineering-consultation-section">
        <div className="consultation-container">
          <div className="consultation-info">
            <h2>Start Your Engineering Journey</h2>
            <p>Transform Your Vision into Architectural Reality</p>
          </div>
          <form onSubmit={handleFormSubmit} className="consultation-form">
            <input 
              type="text" 
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleFormChange}
              required 
            />
            <input 
              type="email" 
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleFormChange}
              required 
            />
            <select 
              name="projectType"
              value={formData.projectType}
              onChange={handleFormChange}
              required
            >
              <option value="">Select Project Type</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="industrial">Industrial</option>
              <option value="infrastructure">Infrastructure</option>
            </select>

            <div className="requirement-selectors">
              <select 
                name="requirementCategory"
                value={formData.requirementCategory}
                onChange={handleFormChange}
                required
              >
                <option value="">Select Requirement Category</option>
                {projectRequirements.map((category, index) => (
                  <option key={index} value={category.category}>
                    {category.category}
                  </option>
                ))}
              </select>

              <select 
                name="specificRequirement"
                value={formData.specificRequirement}
                onChange={handleFormChange}
                required
                disabled={!formData.requirementCategory}
              >
                <option value="">Select Specific Requirement</option>
                {formData.requirementCategory && 
                  projectRequirements
                    .find(cat => cat.category === formData.requirementCategory)
                    ?.options.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))
                }
              </select>
            </div>

            <div className="file-input-container">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="file-input"
              />
              <small>Upload up to 5 images (max 5MB each)</small>
              {selectedFiles.length > 0 && (
                <div className="selected-files">
                  <p>Selected files:</p>
                  <ul>
                    {selectedFiles.map((file, index) => (
                      <li key={index}>{file.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <button 
              type="submit" 
              className="submit-consultation"
              disabled={submitStatus.loading}
            >
              {submitStatus.loading ? 'Submitting...' : 'Request Engineering Consultation'}
            </button>

            {submitStatus.error && (
              <div className="error-message">
                {submitStatus.error}
              </div>
            )}
          </form>
        </div>
      </section>
    </div>
  );
};

export default BuildingEngineeringPage;