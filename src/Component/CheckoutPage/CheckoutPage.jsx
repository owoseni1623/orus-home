import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [checkoutDetails, setCheckoutDetails] = useState({
    // Property Purchase Details
    propertyId: null,
    propertyTitle: '',
    propertyPrice: '',
    
    // Additional Services
    surveyPaper: false,
    certificateOfOccupancy: false,
    buildingEngineering: false,
    
    // Customer Information
    customerInfo: {
      fullName: '',
      email: '',
      phoneNumber: '',
      address: '',
    },
    
    // Additional Requirements
    additionalRequirements: ''
  });

  const [totalCost, setTotalCost] = useState(0);

 // Additional service prices
 const servicePrices = {
  surveyPaper: 500000, // ₦500,000
  certificateOfOccupancy: 750000, // ₦750,000
  buildingEngineering: 1000000, // ₦1,000,000
};

useEffect(() => {
  // Retrieve selected property from localStorage
  const storedProperty = localStorage.getItem('selectedProperty');
  if (storedProperty) {
    const property = JSON.parse(storedProperty);
    setSelectedProperty(property);
    
    // Update checkout details with property information
    setCheckoutDetails(prev => ({
      ...prev,
      propertyId: property.id,
      propertyTitle: property.title,
      propertyPrice: property.price
    }));
  } else {
    // Redirect if no property is selected
    navigate('/services/selling-homes');
  }
}, [navigate]);

useEffect(() => {
  // Calculate total cost with robust price parsing
  let total = 0;
  
  // Parse property price
  if (selectedProperty) {
    // Try to extract numeric value from price
    const priceValue = typeof selectedProperty.price === 'string'
      ? parseInt(selectedProperty.price.replace(/[^0-9]/g, ''), 10)
      : typeof selectedProperty.price === 'number'
      ? selectedProperty.price
      : 0;
    
    total = priceValue || 0;
  }
  
  // Add additional service prices
  if (checkoutDetails.surveyPaper) {
    total += servicePrices.surveyPaper;
  }
  if (checkoutDetails.certificateOfOccupancy) {
    total += servicePrices.certificateOfOccupancy;
  }
  if (checkoutDetails.buildingEngineering) {
    total += servicePrices.buildingEngineering;
  }

  setTotalCost(total);
}, [
  selectedProperty, 
  checkoutDetails.surveyPaper, 
  checkoutDetails.certificateOfOccupancy, 
  checkoutDetails.buildingEngineering
]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('customerInfo.')) {
      const field = name.split('.')[1];
      setCheckoutDetails(prev => ({
        ...prev,
        customerInfo: {
          ...prev.customerInfo,
          [field]: value
        }
      }));
    } else if (type === 'checkbox') {
      setCheckoutDetails(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setCheckoutDetails(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const { customerInfo } = checkoutDetails;
    if (!customerInfo.fullName || !customerInfo.email || !customerInfo.phoneNumber) {
      alert('Please fill in all required customer information');
      return;
    }

    // Save checkout details to localStorage for payment page
    localStorage.setItem('checkoutDetails', JSON.stringify(checkoutDetails));

    // Navigate to payment page
    navigate('/payment');
  };

  if (!selectedProperty) {
    return <div>Loading property details...</div>;
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1>Complete Your Property Purchase</h1>
        
        <div className="property-summary">
          <h2>{selectedProperty.title}</h2>
          <p>Location: {selectedProperty.location}</p>
          <p>Price: {selectedProperty.price}</p>
          <div className="property-details">
            <span>{selectedProperty.bedrooms} Beds</span>
            <span>{selectedProperty.bathrooms} Baths</span>
            <span>{selectedProperty.area}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="customer-info-section">
            <h3>Customer Information</h3>
            <div className="form-group">
              <label>Full Name*</label>
              <input
                type="text"
                name="customerInfo.fullName"
                value={checkoutDetails.customerInfo.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email*</label>
              <input
                type="email"
                name="customerInfo.email"
                value={checkoutDetails.customerInfo.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone Number*</label>
              <input
                type="tel"
                name="customerInfo.phoneNumber"
                value={checkoutDetails.customerInfo.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <textarea
                name="customerInfo.address"
                value={checkoutDetails.customerInfo.address}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="additional-services-section">
            <h3>Additional Services</h3>
            <div className="service-options">
              <label className="service-checkbox">
                <input
                  type="checkbox"
                  name="surveyPaper"
                  checked={checkoutDetails.surveyPaper}
                  onChange={handleInputChange}
                />
                Survey Paper Process (₦500,000)
              </label>
              <label className="service-checkbox">
                <input
                  type="checkbox"
                  name="certificateOfOccupancy"
                  checked={checkoutDetails.certificateOfOccupancy}
                  onChange={handleInputChange}
                />
                Certificate of Occupancy (C of O) Process (₦750,000)
              </label>
              <label className="service-checkbox">
                <input
                  type="checkbox"
                  name="buildingEngineering"
                  checked={checkoutDetails.buildingEngineering}
                  onChange={handleInputChange}
                />
                Building Engineering Services (₦1,000,000)
              </label>
            </div>
          </div>

          <div className="additional-requirements">
            <h3>Additional Requirements</h3>
            <textarea
              name="additionalRequirements"
              placeholder="Any additional requirements or special instructions"
              value={checkoutDetails.additionalRequirements}
              onChange={handleInputChange}
            />
          </div>

          <div className="cost-summary">
            <h3>Cost Breakdown</h3>
            <p>Property Price: {selectedProperty.price}</p>
            {checkoutDetails.surveyPaper && (
              <p>Survey Paper Process: ₦500,000</p>
            )}
            {checkoutDetails.certificateOfOccupancy && (
              <p>Certificate of Occupancy: ₦750,000</p>
            )}
            {checkoutDetails.buildingEngineering && (
              <p>Building Engineering Services: ₦1,000,000</p>
            )}
            <h2>Total Cost: ₦{totalCost.toLocaleString()}</h2>
          </div>

          <div className="checkout-actions">
            <button 
              type="button" 
              className="back-button"
              onClick={() => navigate('/services/selling-homes')}
            >
              Back to Listings
            </button>
            <button 
              type="submit" 
              className="proceed-to-payment"
            >
              Proceed to Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;