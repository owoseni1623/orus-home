import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RentPage.css';

const RentPage = () => {
  const navigate = useNavigate();
  const [propertyData, setPropertyData] = useState({
    title: '',
    monthlyRent: '',
    securityDeposit: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    description: '',
    leaseTerm: '12',
    petsAllowed: false,
    furnished: false,
    utilities: [],
    amenities: [],
    images: [],
    availabilityDate: '',
  });

  const [step, setStep] = useState(1);

  const utilitiesList = [
    'Water', 'Electricity', 'Gas', 'Internet',
    'Cable TV', 'Trash Collection', 'Heating'
  ];

  const amenitiesList = [
    'Swimming Pool', 'Parking', 'Gym', 'Laundry',
    'Security', 'Balcony', 'Storage', 'Air Conditioning'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPropertyData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleListToggle = (list, item) => {
    setPropertyData(prev => ({
      ...prev,
      [list]: prev[list].includes(item)
        ? prev[list].filter(i => i !== item)
        : [...prev[list], item]
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    
    setPropertyData(prev => ({
      ...prev,
      images: [...prev.images, ...imageUrls]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //console.log('Rental property data submitted:', propertyData);
      navigate('/confirmation');
    } catch (error) {
      console.error('Error submitting rental property:', error);
    }
  };

  const renderStep1 = () => (
    <div className="form-section">
      <h2>Basic Information</h2>
      <div className="form-group">
        <label>Property Title</label>
        <input
          type="text"
          name="title"
          value={propertyData.title}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Monthly Rent</label>
          <input
            type="number"
            name="monthlyRent"
            value={propertyData.monthlyRent}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Security Deposit</label>
          <input
            type="number"
            name="securityDeposit"
            value={propertyData.securityDeposit}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={propertyData.location}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Available From</label>
          <input
            type="date"
            name="availabilityDate"
            value={propertyData.availabilityDate}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="form-section">
      <h2>Property Details</h2>
      <div className="form-row">
        <div className="form-group">
          <label>Bedrooms</label>
          <input
            type="number"
            name="bedrooms"
            value={propertyData.bedrooms}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Bathrooms</label>
          <input
            type="number"
            name="bathrooms"
            value={propertyData.bathrooms}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Area (sq ft)</label>
          <input
            type="number"
            name="area"
            value={propertyData.area}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Lease Term (months)</label>
          <select
            name="leaseTerm"
            value={propertyData.leaseTerm}
            onChange={handleInputChange}
            required
          >
            <option value="12">12 months</option>
            <option value="6">6 months</option>
            <option value="3">3 months</option>
            <option value="1">1 month</option>
          </select>
        </div>
      </div>

      <div className="checkbox-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="furnished"
            checked={propertyData.furnished}
            onChange={handleInputChange}
          />
          Furnished
        </label>

        <label className="checkbox-label">
          <input
            type="checkbox"
            name="petsAllowed"
            checked={propertyData.petsAllowed}
            onChange={handleInputChange}
          />
          Pets Allowed
        </label>
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          value={propertyData.description}
          onChange={handleInputChange}
          rows="4"
          required
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="form-section">
      <h2>Utilities & Amenities</h2>
      
      <div className="subsection">
        <h3>Included Utilities</h3>
        <div className="utilities-grid">
          {utilitiesList.map(utility => (
            <div
              key={utility}
              className={`utility-item ${propertyData.utilities.includes(utility) ? 'selected' : ''}`}
              onClick={() => handleListToggle('utilities', utility)}
            >
              {utility}
            </div>
          ))}
        </div>
      </div>

      <div className="subsection">
        <h3>Property Amenities</h3>
        <div className="amenities-grid">
          {amenitiesList.map(amenity => (
            <div
              key={amenity}
              className={`amenity-item ${propertyData.amenities.includes(amenity) ? 'selected' : ''}`}
              onClick={() => handleListToggle('amenities', amenity)}
            >
              {amenity}
            </div>
          ))}
        </div>
      </div>

      <div className="image-upload-section">
        <h3>Property Images</h3>
        <label className="image-upload-label">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <span className="upload-button">Upload Images</span>
        </label>

        <div className="image-preview-grid">
          {propertyData.images.map((image, index) => (
            <div key={index} className="image-preview">
              <img src={image} alt={`Property ${index + 1}`} />
              <button
                className="remove-image"
                onClick={() => {
                  setPropertyData(prev => ({
                    ...prev,
                    images: prev.images.filter((_, i) => i !== index)
                  }));
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="rent-page">
      <div className="rent-container">
        <h1>List Your Property for Rent</h1>
        
        <div className="progress-bar">
          <div
            className="progress"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}

          <div className="button-group">
            {step > 1 && (
              <button
                type="button"
                className="back-button"
                onClick={() => setStep(prev => prev - 1)}
              >
                Back
              </button>
            )}

            {step < 3 ? (
              <button
                type="button"
                className="next-button"
                onClick={() => setStep(prev => prev + 1)}
              >
                Next
              </button>
            ) : (
              <button type="submit" className="submit-button">
                List Property
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default RentPage;