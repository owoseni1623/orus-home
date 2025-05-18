import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AgentPage.css';

const AgentPage = () => {
    const agents = [
        {
          id: 1,
          name: "Sarah Johnson",
          role: "Senior Real Estate Agent",
          experience: "8 years",
          specialization: ["Luxury Homes", "Commercial Properties"],
          rating: 4.9,
          reviews: 156,
          properties: 24,
          deals: 89,
          image: "/Images/agent.jpeg",
          email: "sarah.j@orushomes.com",
          phone: "+1 (234) 567-8901",
          bio: "Sarah is a top-performing agent with expertise in luxury real estate. She has consistently ranked in the top 1% of agents nationwide and specializes in high-end property transactions. Her attention to detail and vast network of connections make her the go-to agent for luxury home buyers and sellers.",
          languages: ["English", "Spanish"],
          certifications: ["Licensed Real Estate Broker", "Luxury Home Marketing Specialist"],
          achievements: ["Best Agent 2023", "Top Producer 2022"]
        },
        {
          id: 2,
          name: "Michael Chen",
          role: "Commercial Property Specialist",
          experience: "12 years",
          specialization: ["Commercial Properties", "Investment Properties"],
          rating: 4.8,
          reviews: 203,
          properties: 31,
          deals: 147,
          image: "/Images/agent0.png",
          email: "michael.c@orushomes.com",
          phone: "+1 (234) 567-8902",
          bio: "Michael brings over a decade of commercial real estate expertise to the table. His background in finance and deep understanding of market trends has helped countless investors maximize their returns. He specializes in identifying high-potential commercial opportunities.",
          languages: ["English", "Mandarin", "Cantonese"],
          certifications: ["Certified Commercial Investment Member (CCIM)", "Commercial Real Estate Specialist"],
          achievements: ["Commercial Agent of the Year 2023", "Highest Transaction Volume 2022"]
        },
        {
          id: 3,
          name: "Emily Rodriguez",
          role: "New Construction Expert",
          experience: "6 years",
          specialization: ["New Construction", "Residential", "Investment Properties"],
          rating: 4.7,
          reviews: 98,
          properties: 19,
          deals: 73,
          image: "/Images/agent1.jpg",
          email: "emily.r@orushomes.com",
          phone: "+1 (234) 567-8903",
          bio: "Emily specializes in new construction properties and has strong relationships with major developers in the region. Her architectural background gives her unique insights into construction quality and design potential. She excels at helping clients navigate the new construction buying process.",
          languages: ["English", "Spanish", "Portuguese"],
          certifications: ["New Home Construction Specialist", "Green Building Certified"],
          achievements: ["Rising Star Award 2023", "Most New Construction Sales 2022"]
        },
        {
          id: 4,
          name: "James Wilson",
          role: "Residential Property Expert",
          experience: "15 years",
          specialization: ["Residential", "Luxury Homes"],
          rating: 4.9,
          reviews: 287,
          properties: 28,
          deals: 195,
          image: "/Images/agent2.jpg",
          email: "james.w@orushomes.com",
          phone: "+1 (234) 567-8904",
          bio: "With 15 years in residential real estate, James has become one of the most trusted names in the industry. His client-first approach and extensive market knowledge have earned him a loyal following. He specializes in helping families find their perfect home.",
          languages: ["English", "French"],
          certifications: ["Certified Residential Specialist (CRS)", "Accredited Buyer's Representative"],
          achievements: ["Lifetime Achievement Award 2023", "Best Customer Service 2022"]
        },
        {
          id: 5,
          name: "Aisha Patel",
          role: "Investment Property Specialist",
          experience: "10 years",
          specialization: ["Investment Properties", "Commercial Properties", "Residential"],
          rating: 4.8,
          reviews: 167,
          properties: 42,
          deals: 126,
          image: "/Images/agent3.jpg",
          email: "aisha.p@orushomes.com",
          phone: "+1 (234) 567-8905",
          bio: "Aisha's background in financial planning combined with her real estate expertise makes her an invaluable asset for investors. She specializes in identifying properties with high ROI potential and has helped numerous clients build successful real estate portfolios.",
          languages: ["English", "Hindi", "Gujarati"],
          certifications: ["Certified Property Manager (CPM)", "Investment Property Specialist"],
          achievements: ["Investment Specialist of the Year 2023", "Portfolio Excellence Award 2022"]
        },
        {
          id: 6,
          name: "David Thompson",
          role: "Luxury Estate Specialist",
          experience: "20 years",
          specialization: ["Luxury Homes", "Investment Properties", "Commercial Properties"],
          rating: 5.0,
          reviews: 312,
          properties: 35,
          deals: 243,
          image: "/Images/agent4.webp",
          email: "david.t@orushomes.com",
          phone: "+1 (234) 567-8906",
          bio: "David is our most experienced luxury real estate specialist with two decades in the industry. His discretion, extensive network, and deep understanding of the luxury market have made him the preferred agent for high-net-worth individuals and celebrities.",
          languages: ["English", "Italian", "German"],
          certifications: ["Luxury Home Marketing Guild Member", "Certified Luxury Home Specialist"],
          achievements: ["Diamond Club Member 2023", "Luxury Sales Excellence 2022", "Hall of Fame Inductee"]
        }
      ];

      const navigate = useNavigate();
      const [selectedAgent, setSelectedAgent] = useState(null);
      const [filterSpecialization, setFilterSpecialization] = useState('all');
      const [searchQuery, setSearchQuery] = useState('');
      const [showScheduleModal, setShowScheduleModal] = useState(false);
      const [scheduleForm, setScheduleForm] = useState({
        date: '',
        time: '',
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    
      const specializations = [
        'all',
        'Luxury Homes',
        'Commercial Properties',
        'Residential',
        'Investment Properties',
        'New Construction'
      ];
    
      const handleAgentClick = (agent) => {
        setSelectedAgent(agent);
      };
    
      const handleViewListings = (agentId) => {
        navigate(`/property-listing?agent=${agentId}`);
      };
    
      const handleScheduleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically make an API call to save the meeting
        console.log('Schedule meeting:', {
          agent: selectedAgent,
          ...scheduleForm
        });
        
        // Reset form and close modals
        setScheduleForm({
          date: '',
          time: '',
          name: '',
          email: '',
          phone: '',
          message: ''
        });
        setShowScheduleModal(false);
        setSelectedAgent(null);
      };
    
      const filteredAgents = agents.filter(agent => {
        const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesSpecialization = filterSpecialization === 'all' || 
          agent.specialization.includes(filterSpecialization);
        return matchesSearch && matchesSpecialization;
      });

      // Add new state for join team modal
    const [showJoinModal, setShowJoinModal] = useState(false);
    const [joinForm, setJoinForm] = useState({
        fullName: '',
        email: '',
        phone: '',
        experience: '',
        licenses: '',
        specialization: [],
        languages: '',
        resume: null,
        coverLetter: '',
        linkedin: '',
        referral: ''
    });

    // Add specialization options handler
    const handleSpecializationChange = (spec) => {
        setJoinForm(prev => {
            const updatedSpecs = prev.specialization.includes(spec)
                ? prev.specialization.filter(s => s !== spec)
                : [...prev.specialization, spec];
            return { ...prev, specialization: updatedSpecs };
        });
    };

    // Handle file upload
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size <= 5 * 1024 * 1024) { // 5MB limit
            setJoinForm(prev => ({ ...prev, resume: file }));
        } else {
            alert('Please upload a file smaller than 5MB');
        }
    };

    // Handle join team form submission
    const handleJoinSubmit = (e) => {
        e.preventDefault();
        // Here you would typically make an API call to submit the application
        console.log('Join team application:', joinForm);

        // Create FormData for file upload
        const formData = new FormData();
        Object.keys(joinForm).forEach(key => {
            if (key === 'specialization') {
                formData.append(key, JSON.stringify(joinForm[key]));
            } else if (key === 'resume' && joinForm[key]) {
                formData.append(key, joinForm[key]);
            } else {
                formData.append(key, joinForm[key]);
            }
        });

        // Reset form and close modal
        setJoinForm({
            fullName: '',
            email: '',
            phone: '',
            experience: '',
            licenses: '',
            specialization: [],
            languages: '',
            resume: null,
            coverLetter: '',
            linkedin: '',
            referral: ''
        });
        setShowJoinModal(false);
        alert('Thank you for your application! Our team will review it and contact you soon.');
    };
    
      const AgentCard = ({ agent }) => (
        <div className="agt002-agent-card" onClick={() => handleAgentClick(agent)}>
          <div className="agt002-agent-card-header">
            <div className="agt002-agent-image-container">
              <img src={agent.image} alt={agent.name} className="agt002-agent-image" />
              <div className="agt002-agent-status online"></div>
            </div>
            <div className="agt002-agent-rating">
              <span className="agt002-star">★</span>
              {agent.rating}
            </div>
          </div>
          
          <div className="agt002-agent-info">
            <h3>{agent.name}</h3>
            <p className="agt002-agent-role">{agent.role}</p>
            <div className="agt002-agent-specialties">
              {agent.specialization.map((spec, index) => (
                <span key={index} className="agt002-specialty-tag">{spec}</span>
              ))}
            </div>
          </div>
    
          <div className="agt002-agent-stats">
            <div className="agt002-stat">
              <span className="agt002-stat-number">{agent.properties}</span>
              <span className="agt002-stat-label">Listings</span>
            </div>
            <div className="agt002-stat">
              <span className="agt002-stat-number">{agent.deals}</span>
              <span className="agt002-stat-label">Deals</span>
            </div>
            <div className="agt002-stat">
              <span className="agt002-stat-number">{agent.reviews}</span>
              <span className="agt002-stat-label">Reviews</span>
            </div>
          </div>
    
          <button className="agt002-contact-button">Contact Agent</button>
        </div>
      );
    
      const ScheduleMeetingModal = ({ agent, onClose }) => (
        <div className="agt002-modal-overlay" onClick={onClose}>
          <div className="agt002-modal-content schedule-modal" onClick={e => e.stopPropagation()}>
            <button className="agt002-close-button" onClick={onClose}>×</button>
            
            <h2>Schedule Meeting with {agent.name}</h2>
            <form onSubmit={handleScheduleSubmit}>
              <div className="agt002-form-group">
                <label>Select Date</label>
                <input
                  type="date"
                  value={scheduleForm.date}
                  onChange={e => setScheduleForm({...scheduleForm, date: e.target.value})}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
    
              <div className="agt002-form-group">
                <label>Select Time</label>
                <input
                  type="time"
                  value={scheduleForm.time}
                  onChange={e => setScheduleForm({...scheduleForm, time: e.target.value})}
                  required
                />
              </div>
    
              <div className="agt002-form-group">
                <label>Your Name</label>
                <input
                  type="text"
                  value={scheduleForm.name}
                  onChange={e => setScheduleForm({...scheduleForm, name: e.target.value})}
                  required
                />
              </div>
    
              <div className="agt002-form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={scheduleForm.email}
                  onChange={e => setScheduleForm({...scheduleForm, email: e.target.value})}
                  required
                />
              </div>
    
              <div className="agt002-form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  value={scheduleForm.phone}
                  onChange={e => setScheduleForm({...scheduleForm, phone: e.target.value})}
                  required
                />
              </div>
    
              <div className="agt002-form-group">
                <label>Message (Optional)</label>
                <textarea
                  value={scheduleForm.message}
                  onChange={e => setScheduleForm({...scheduleForm, message: e.target.value})}
                  rows="4"
                />
              </div>
    
              <button type="submit" className="agt002-submit-button">Schedule Meeting</button>
            </form>
          </div>
        </div>
      );
    
      const AgentDetailModal = ({ agent, onClose }) => (
        <div className="agt002-modal-overlay" onClick={onClose}>
          <div className="agt002-modal-content" onClick={e => e.stopPropagation()}>
            <button className="agt002-close-button" onClick={onClose}>×</button>
            
            <div className="agt002-agent-detail-header">
              <img src={agent.image} alt={agent.name} className="agt002-agent-detail-image" />
              <div className="agt002-agent-detail-info">
                <h2>{agent.name}</h2>
                <p className="agt002-agent-title">{agent.role}</p>
                <div className="agt002-agent-contact-info">
                  <p><i className="agt002-icon-phone"></i>{agent.phone}</p>
                  <p><i className="agt002-icon-email"></i>{agent.email}</p>
                </div>
              </div>
            </div>
    
            <div className="agt002-agent-detail-stats">
              <div className="agt002-detail-stat">
                <h4>Experience</h4>
                <p>{agent.experience}</p>
              </div>
              <div className="agt002-detail-stat">
                <h4>Properties Sold</h4>
                <p>{agent.deals}</p>
              </div>
              <div className="agt002-detail-stat">
                <h4>Rating</h4>
                <p>★ {agent.rating}/5</p>
              </div>
            </div>
    
            <div className="agt002-agent-detail-section">
              <h3>About</h3>
              <p>{agent.bio}</p>
            </div>
    
            <div className="agt002-agent-detail-section">
              <h3>Specialization</h3>
              <div className="agt002-specialization-tags">
                {agent.specialization.map((spec, index) => (
                  <span key={index} className="agt002-specialty-tag">{spec}</span>
                ))}
              </div>
            </div>
    
            <div className="agt002-agent-detail-section">
              <h3>Languages</h3>
              <div className="agt002-language-list">
                {agent.languages.map((language, index) => (
                  <span key={index} className="agt002-language-tag">{language}</span>
                ))}
              </div>
            </div>
    
            <div className="agt002-agent-detail-section">
              <h3>Certifications & Achievements</h3>
              <ul className="agt002-achievements-list">
                {agent.certifications.map((cert, index) => (
                  <li key={index}>{cert}</li>
                ))}
                {agent.achievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
            </div>
    
            <div className="agt002-agent-detail-actions">
              <button 
                className="agt002-primary-button"
                onClick={() => {
                  setShowScheduleModal(true);
                  onClose();
                }}
              >
                Schedule Meeting
              </button>
              <button 
                className="agt002-secondary-button"
                onClick={() => handleViewListings(agent.id)}
              >
                View Listings
              </button>
            </div>
          </div>
        </div>
      );

      const JoinTeamModal = ({ onClose }) => (
        <div className="agt002-modal-overlay" onClick={onClose}>
            <div className="agt002-modal-content join-modal" onClick={e => e.stopPropagation()}>
                <button className="agt002-close-button" onClick={onClose}>×</button>
                
                <h2>Join Our Team</h2>
                <p className="agt002-join-subtitle">Take your real estate career to the next level with Orus Homes & Properties</p>

                <form onSubmit={handleJoinSubmit} className="agt002-join-form">
                    <div className="agt002-form-group">
                        <label>Full Name *</label>
                        <input
                            type="text"
                            value={joinForm.fullName}
                            onChange={e => setJoinForm({...joinForm, fullName: e.target.value})}
                            required
                        />
                    </div>

                    <div className="agt002-form-group">
                        <label>Email *</label>
                        <input
                            type="email"
                            value={joinForm.email}
                            onChange={e => setJoinForm({...joinForm, email: e.target.value})}
                            required
                        />
                    </div>

                    <div className="agt002-form-group">
                        <label>Phone *</label>
                        <input
                            type="tel"
                            value={joinForm.phone}
                            onChange={e => setJoinForm({...joinForm, phone: e.target.value})}
                            required
                        />
                    </div>

                    <div className="agt002-form-group">
                        <label>Years of Experience *</label>
                        <select
                            value={joinForm.experience}
                            onChange={e => setJoinForm({...joinForm, experience: e.target.value})}
                            required
                        >
                            <option value="">Select experience</option>
                            <option value="0-2">0-2 years</option>
                            <option value="3-5">3-5 years</option>
                            <option value="6-10">6-10 years</option>
                            <option value="10+">10+ years</option>
                        </select>
                    </div>

                    <div className="agt002-form-group">
                        <label>Real Estate Licenses & Certifications *</label>
                        <input
                            type="text"
                            value={joinForm.licenses}
                            onChange={e => setJoinForm({...joinForm, licenses: e.target.value})}
                            placeholder="e.g., Licensed Real Estate Broker, CCIM"
                            required
                        />
                    </div>

                    <div className="agt002-form-group">
                        <label>Areas of Specialization *</label>
                        <div className="agt002-specialization-checkboxes">
                            {specializations.filter(spec => spec !== 'all').map((spec) => (
                                <label key={spec} className="agt002-checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={joinForm.specialization.includes(spec)}
                                        onChange={() => handleSpecializationChange(spec)}
                                    />
                                    {spec}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="agt002-form-group">
                        <label>Languages Spoken</label>
                        <input
                            type="text"
                            value={joinForm.languages}
                            onChange={e => setJoinForm({...joinForm, languages: e.target.value})}
                            placeholder="e.g., English, Spanish, Mandarin"
                        />
                    </div>

                    <div className="agt002-form-group">
                        <label>Resume/CV (PDF, max 5MB) *</label>
                        <input
                            type="file"
                            accept=".pdf"
                            onChange={handleFileChange}
                            required
                        />
                    </div>

                    <div className="agt002-form-group">
                        <label>Cover Letter</label>
                        <textarea
                            value={joinForm.coverLetter}
                            onChange={e => setJoinForm({...joinForm, coverLetter: e.target.value})}
                            rows="4"
                            placeholder="Tell us why you'd be a great addition to our team"
                        />
                    </div>

                    <div className="agt002-form-group">
                        <label>LinkedIn Profile</label>
                        <input
                            type="url"
                            value={joinForm.linkedin}
                            onChange={e => setJoinForm({...joinForm, linkedin: e.target.value})}
                            placeholder="https://linkedin.com/in/yourprofile"
                        />
                    </div>

                    <div className="agt002-form-group">
                        <label>Referral Source</label>
                        <input
                            type="text"
                            value={joinForm.referral}
                            onChange={e => setJoinForm({...joinForm, referral: e.target.value})}
                            placeholder="How did you hear about us?"
                        />
                    </div>

                    <button type="submit" className="agt002-submit-button">Submit Application</button>
                </form>
            </div>
        </div>
    );
    
      return (
        <div className="agt002-agent-page">
          <div className="agt002-agent-page-header">
            <h1>Our Real Estate Experts</h1>
            <p>Meet our team of professional real estate agents dedicated to helping you find your perfect property</p>
          </div>
    
          <div className="agt002-search-filter-section">
            <div className="agt002-search-bar">
              <input
                type="text"
                placeholder="Search agents by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
    
            <div className="agt002-filter-buttons">
              {specializations.map((spec) => (
                <button
                  key={spec}
                  className={`filter-button ${filterSpecialization === spec ? 'active' : ''}`}
                  onClick={() => setFilterSpecialization(spec)}
                >
                  {spec.charAt(0).toUpperCase() + spec.slice(1)}
                </button>
              ))}
            </div>
          </div>
    
          <div className="agt002-agents-grid">
            {filteredAgents.map(agent => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
    
          {selectedAgent && (
            <AgentDetailModal
              agent={selectedAgent}
              onClose={() => setSelectedAgent(null)}
            />
          )}
    
          {showScheduleModal && selectedAgent && (
            <ScheduleMeetingModal
              agent={selectedAgent}
              onClose={() => setShowScheduleModal(false)}
            />
          )}
    
            <div className="agt002-join-team-section">
                <h2>Join Our Team</h2>
                <p>Are you a passionate real estate professional? We're always looking for talented agents to join Orus Homes & Properties.</p>
                <button 
                    className="agt002-join-button"
                    onClick={() => setShowJoinModal(true)}
                >
                    Apply Now
                </button>
            </div>
            {showJoinModal && (
                <JoinTeamModal onClose={() => setShowJoinModal(false)} />
            )}
        </div>
      );
    };
    
    export default AgentPage;