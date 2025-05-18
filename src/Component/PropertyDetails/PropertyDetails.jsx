import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './PropertyDetails.css';

const PropertyDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('overview');
    const [showContactForm, setShowContactForm] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [savedProperties, setSavedProperties] = useState(
        JSON.parse(localStorage.getItem('savedProperties')) || []
    );

    // Get the property data from the location state
    const property = location.state?.property || {
        id: 1,
        title: "Luxury Villa with Ocean View",
        price: 850000,
        location: "123 Coastal Drive, Malibu, CA",
        bedrooms: 5,
        bathrooms: 4.5,
        area: 4200,
        image: "/Images/orus5.webp",
        type: "sale",
        amenities: [
            "Swimming Pool",
            "Smart Home System",
            "Wine Cellar",
            "Home Theater",
            "Outdoor Kitchen",
            "3-Car Garage",
            "Security System",
            "Garden",
            "Ocean View"
        ],
        description: "This stunning contemporary villa offers the perfect blend of luxury and comfort...",
        yearBuilt: 2020,
        parkingSpaces: 3,
        status: "Available",
        virtualTour: true,
        features: {
            interior: [
                "Gourmet Kitchen with Premium Appliances",
                "Master Suite with Ocean View",
                "Custom Walk-in Closets",
                "Smart Home Technology",
                "Wine Cellar",
                "Home Theater"
            ],
            exterior: [
                "Infinity Pool",
                "Outdoor Kitchen",
                "Landscaped Gardens",
                "Multiple Terraces",
                "3-Car Garage",
                "Security System"
            ]
        },
        additionalDetails: {
            propertyType: "Single Family",
            lotSize: "0.75 acres",
            heating: "Central",
            cooling: "Central",
            architecture: "Contemporary",
            roofType: "Flat",
            foundation: "Concrete",
            schoolDistrict: "Malibu Unified"
        },
        agent: {
            name: "Sarah Johnson",
            phone: "(310) 555-0123",
            email: "sarah.j@realestate.com",
            image: "/Images/orusAgent.jpeg",
            experience: "15+ years",
            specialization: "Luxury Properties"
        }
    };

    const propertyImages = [
        property.image,
        "/Images/orus0.avif",
        "/Images/orus1.png",
        "/Images/orus2.jpeg",
        "/Images/orus3.jpeg",
        "/Images/orus4.jpg"
    ];

    // Save property to localStorage when navigating to checkout
    const handleProceedToCheckout = () => {
        localStorage.setItem('selectedProperty', JSON.stringify(property));
        navigate(`/checkout/${property.id}`);
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle contact form submission
    const handleContactSubmit = (e) => {
        e.preventDefault();
        
        // Here you would typically send the form data to your backend
        console.log('Form submitted:', {
            ...formData,
            propertyId: property.id,
            propertyTitle: property.title,
            agentName: property.agent.name
        });

        // Show success message
        alert('Thank you for your message. The agent will contact you soon!');

        // Reset form and close modal
        setFormData({
            name: '',
            email: '',
            phone: '',
            message: ''
        });
        setShowContactForm(false);
    };

    // Handle share functionality
    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: property.title,
                text: `Check out this property: ${property.title} in ${property.location}`,
                url: window.location.href
            })
            .then(() => console.log('Shared successfully'))
            .catch((error) => console.log('Error sharing:', error));
        } else {
            // Fallback for browsers that don't support native sharing
            const shareUrl = window.location.href;
            navigator.clipboard.writeText(shareUrl)
                .then(() => alert('Link copied to clipboard!'))
                .catch(err => console.error('Error copying link:', err));
        }
    };

    // Handle save to favorites functionality
    const handleSave = () => {
        const propertyToSave = {
            id: property.id,
            title: property.title,
            price: property.price,
            location: property.location,
            image: property.image
        };

        const updatedSavedProperties = savedProperties.some(p => p.id === property.id)
            ? savedProperties.filter(p => p.id !== property.id)
            : [...savedProperties, propertyToSave];

        setSavedProperties(updatedSavedProperties);
        localStorage.setItem('savedProperties', JSON.stringify(updatedSavedProperties));

        alert(
            savedProperties.some(p => p.id === property.id)
                ? 'Property removed from favorites!'
                : 'Property saved to favorites!'
        );
    };

    return (
        <div className="property-details-page">
            {/* Image Gallery Section */}
            <div className="image-gallery">
                <div className="main-image">
                    <img src={propertyImages[selectedImageIndex]} alt={property.title} />
                    <button className="back-button" onClick={() => navigate(-1)}>
                        <i className="fas fa-arrow-left"></i> Back to Listings
                    </button>
                    {property.virtualTour && (
                        <button className="virtual-tour-button">
                            <i className="fas fa-vr-cardboard"></i> Virtual Tour
                        </button>
                    )}
                </div>
                <div className="thumbnail-strip">
                    {propertyImages.map((image, index) => (
                        <div 
                            key={index}
                            className={`thumbnail ${selectedImageIndex === index ? 'active' : ''}`}
                            onClick={() => setSelectedImageIndex(index)}
                        >
                            <img src={image} alt={`View ${index + 1}`} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Property Information */}
            <div className="property-info">
                <h1>{property.title}</h1>
                <p className="price">${property.price.toLocaleString()}</p>
                <p className="location">{property.location}</p>
                
                {/* Quick Actions */}
                <div className="quick-actions">
                    <button onClick={handleShare}>
                        <i className="fas fa-share"></i> Share
                    </button>
                    <button onClick={handleSave}>
                        <i className={`fas fa-heart ${savedProperties.some(p => p.id === property.id) ? 'active' : ''}`}></i>
                        {savedProperties.some(p => p.id === property.id) ? 'Saved' : 'Save'}
                    </button>
                    <button onClick={handleProceedToCheckout} className="buy-now-button">
                        Buy Now
                    </button>
                </div>
            </div>

            {/* Contact Form Modal */}
            {showContactForm && (
                <div className="modal-overlay">
                    <div className="contact-form-modal">
                        <button 
                            className="close-modal"
                            onClick={() => setShowContactForm(false)}
                        >
                            ×
                        </button>
                        <h3>Contact Agent</h3>
                        <form onSubmit={handleContactSubmit}>
                            <div className="form-group">
                                <label>Name</label>
                                <input 
                                    type="text" 
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input 
                                    type="email" 
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone</label>
                                <input 
                                    type="tel" 
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Message</label>
                                <textarea 
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="submit-button">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Agent Section */}
            <div className="contact-section">
                <div className="agent-info">
                    {property.agent?.image && (
                        <img 
                            src={property.agent.image} 
                            alt={property.agent.name} 
                            className="agent-image"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/Images/default-agent.jpeg';
                            }}
                        />
                    )}
                    <div className="agent-details">
                        <h3>{property.agent?.name}</h3>
                        <p className="agent-title">Real Estate Agent</p>
                        <p className="agent-experience">{property.agent?.experience} Experience</p>
                        <p className="agent-specialization">{property.agent?.specialization}</p>
                    </div>
                </div>
                <button 
                    className="contact-button"
                    onClick={() => setShowContactForm(true)}
                >
                    Contact Agent
                </button>
            </div>
        </div>
    );
};

export default PropertyDetails;