import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LandSellingPage.css';

const LandCard = ({ land, onDetailView, onInquiryClick, isAdmin, onEdit, onDelete, onToggleAvailability }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  
  const DEFAULT_PLACEHOLDER = '/src/assets/placeholder-property.jpg';

  const getImageUrl = (imagePath) => {
    // Remove any extra quotes
    imagePath = imagePath.replace(/^["']|["']$/g, '');

    if (!imagePath) return DEFAULT_PLACEHOLDER;
    
    // If it's a full URL, return as is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    
    // Ensure the image path is clean
    const filename = imagePath
      .replace(/^uploads[/\\]/, '') // Remove 'uploads/' or 'uploads\' prefix
      .replace(/\\/g, '/') // Normalize slashes
      .split('/').pop(); // Get the actual filename
    
    // Construct the full URL
    return `${API_BASE_URL.replace('/api', '')}/uploads/lands/${encodeURIComponent(filename)}`;
  };
  

  const handleImageError = (e) => {
    console.error('Image failed to load:', e.target.src);
    setImageError(true);
    e.target.src = DEFAULT_PLACEHOLDER;
  };

  const cycleImages = (e, direction) => {
    e.stopPropagation();
    if (!land.images?.length) return;
    
    const landImages = land.images;
    const newIndex = direction === 'next' 
      ? (currentImageIndex + 1) % landImages.length
      : (currentImageIndex - 1 + landImages.length) % landImages.length;
    setCurrentImageIndex(newIndex);
    setImageError(false);
  };

  const currentImageUrl = imageError || !land.images?.length
    ? DEFAULT_PLACEHOLDER
    : getImageUrl(land.images[currentImageIndex]);

  const formatPrice = (price) => {
    try {
      return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN'
      }).format(price);
    } catch (err) {
      console.error('Error formatting price:', err);
      return price;
    }
  };

  return (
    <div className="land006-card" onClick={() => onDetailView(land)}>
      <div className="land006-image-container">
        <img 
          src={currentImageUrl}
          alt={land.title || 'Land Image'} 
          className="land006-main-image"
          onError={handleImageError}
          style={{
            objectFit: 'cover', // Ensure image fills container
            width: '100%',
            height: '250px', // Fixed height to prevent layout shift
            minHeight: '250px'
          }}
          crossOrigin="anonymous"
        />
        {land.images?.length > 1 && !imageError && (
          <div className="land006-image-navigation">
            <button onClick={(e) => {
              e.stopPropagation();
              setCurrentImageIndex((prev) => 
                (prev - 1 + land.images.length) % land.images.length
              );
              setImageError(false);
            }}>◀</button>
            <button onClick={(e) => {
              e.stopPropagation();
              setCurrentImageIndex((prev) => 
                (prev + 1) % land.images.length
              );
              setImageError(false);
            }}>▶</button>
          </div>
        )}
      </div>
      
      <div className="land006-details">
        <h3>{land.title}</h3>
        <p className="land006-price">{formatPrice(land.price)}</p>
        <div className="land006-meta">
          <span>{land.location}</span>
          <span>{land.area}</span>
        </div>
        <div className="land006-actions" onClick={e => e.stopPropagation()}>
          {isAdmin ? (
            <>
              <button onClick={() => onEdit(land)} className="land006-edit-btn">
                Edit
              </button>
              <button onClick={() => onDelete(land._id)} className="land006-delete-btn">
                Delete
              </button>
              <button 
                onClick={() => onToggleAvailability(land)}
                className={`land006-availability-btn ${land.isAvailable ? 'land006-unpublish' : 'land006-publish'}`}
              >
                {land.isAvailable ? 'Unpublish' : 'Publish'}
              </button>
            </>
          ) : (
            <>
              <button onClick={() => onDetailView(land)} className="land006-detail-view-btn">
                View Details
              </button>
              <button onClick={() => onInquiryClick(land)} className="land006-inquiry-btn">
                Make Inquiry
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const LandSellingPage = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLand, setSelectedLand] = useState(null);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchParams, setSearchParams] = useState({
    minPrice: '',
    maxPrice: '',
    location: '',
    size: ''
  });

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  const DEFAULT_PLACEHOLDER = '/src/assets/placeholder-property.jpg';

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAdmin(!!token);
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const config = {
        headers: {}
      };

      if (isAdmin) {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
      }

      const response = await axios.get(`${API_BASE_URL}/lands`, config);
      setProperties(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching properties. Please try again later.');
      setLoading(false);
      console.error('Error:', err);
    }
  };

  const handleSearchChange = async (e) => {
    const { name, value } = e.target;
    const updatedParams = {
      ...searchParams,
      [name]: value
    };
    setSearchParams(updatedParams);

    try {
      setLoading(true);
      const queryString = new URLSearchParams(updatedParams).toString();
      const response = await axios.get(`${API_BASE_URL}/lands/search?${queryString}`);
      setProperties(response.data);
    } catch (err) {
      setError('Error searching properties. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (land) => {
    navigate(`/admin/lands/edit/${land._id}`);
  };

  const handleDelete = async (landId) => {
    if (window.confirm('Are you sure you want to delete this land property?')) {
      try {
        await axios.delete(`${API_BASE_URL}/lands/${landId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        fetchProperties();
      } catch (error) {
        console.error('Error deleting land:', error);
      }
    }
  };

  const handleToggleAvailability = async (land) => {
    try {
      await axios.put(
        `${API_BASE_URL}/lands/${land._id}`,
        {
          ...land,
          isAvailable: !land.isAvailable
        },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      fetchProperties();
    } catch (error) {
      console.error('Error toggling availability:', error);
    }
  };

  const handleLandDetailView = (land) => {
    const processedLand = {
      ...land,
      images: land.images?.map(imagePath => {
        if (!imagePath) return DEFAULT_PLACEHOLDER;
        
        // If it's a full URL, return as is
        if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
          return imagePath;
        }
        
        // Normalize path
        const filename = imagePath
          .replace(/^uploads[/\\]/, '') // Remove 'uploads/' or 'uploads\' prefix
          .replace(/\\/g, '/') // Normalize slashes
          .split('/').pop(); // Get the actual filename
        
        // Construct full URL
        return `${API_BASE_URL.replace('/api', '')}/uploads/lands/${filename}`;
      }) || []
    };
    
    setSelectedLand(processedLand);
    setModalImageIndex(0);
  };

  const handleProceedToInquiry = (land) => {
    localStorage.setItem('selectedProperty', JSON.stringify(land));
    navigate('/checkout');
  };

  const handleBuyLand = (land) => {
    localStorage.setItem('selectedProperty', JSON.stringify(land));
    navigate('/checkout');
  };

  if (loading) {
    return <div className="loading-spinner">Loading properties...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="land006-selling-page">
      <header className="land006-header">
        <div className="land006-header-content">
          <h1>SB.Orus Nigeria Limited</h1>
          <p>Transforming Land Investments into Reality</p>
          {isAdmin && (
            <div className="land006-admin-controls">
              <button onClick={() => navigate('/admin/lands/new')} className="land006-add-land-btn">
                Add New Land
              </button>
            </div>
          )}
        </div>
      </header>
  
      <section className="land006-search-section">
        <div className="land006-search-container">
          <input 
            type="number" 
            name="minPrice" 
            placeholder="Min Price (₦)"
            value={searchParams.minPrice}
            onChange={handleSearchChange}
          />
          <input 
            type="number" 
            name="maxPrice" 
            placeholder="Max Price (₦)"
            value={searchParams.maxPrice}
            onChange={handleSearchChange}
          />
          <input 
            type="text" 
            name="location" 
            placeholder="Location"
            value={searchParams.location}
            onChange={handleSearchChange}
          />
          <input 
            type="text" 
            name="size" 
            placeholder="Land Size"
            value={searchParams.size}
            onChange={handleSearchChange}
          />
        </div>
      </section>
  
      <section className="land006-featured-lands">
        <h2>Available Land Properties</h2>
        <div className="land006-lands-grid">
          {properties.map(land => (
            <LandCard 
              key={land._id} 
              land={land}
              isAdmin={isAdmin}
              onDetailView={handleLandDetailView}
              onInquiryClick={handleProceedToInquiry}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleAvailability={handleToggleAvailability}
            />
          ))}
        </div>
      </section>
  
      {selectedLand && (
        <div className="land006-detail-modal">
          <div className="land006-modal-overlay" onClick={() => setSelectedLand(null)}></div>
          <div className="land006-modal-content">
            <button 
              onClick={() => setSelectedLand(null)} 
              className="land006-close-modal-btn"
            >
              ×
            </button>
            <div className="land006-modal-header">
              <h2>{selectedLand.title}</h2>
              <p className="land006-land-price">{new Intl.NumberFormat('en-NG', {
                style: 'currency',
                currency: 'NGN'
              }).format(selectedLand.price)}</p>
            </div>
            
            <div className="land006-modal-body">
            {selectedLand.images && selectedLand.images.length > 0 && (
              <div className="land006-modal-image-container">
                <img 
                  src={selectedLand.images[modalImageIndex]}
                  alt={selectedLand.title}
                  className="land006-modal-land-image"
                  onError={(e) => {
                    e.target.src = '/src/assets/placeholder-property.jpg';
                  }}
                  style={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '400px', // Fixed height
                    minHeight: '400px'
                  }}
                  crossOrigin="anonymous"
                />
                  
                  {selectedLand.images.length > 1 && (
                    <div className="land006-modal-image-navigation">
                      <button 
                        onClick={() => setModalImageIndex((prev) => 
                          (prev - 1 + selectedLand.images.length) % selectedLand.images.length
                        )}
                        className="land006-modal-nav-btn land006-prev"
                      >
                        ◀
                      </button>
                      <button 
                        onClick={() => setModalImageIndex((prev) => 
                          (prev + 1) % selectedLand.images.length
                        )}
                        className="land006-modal-nav-btn land006-next"
                      >
                        ▶
                      </button>
                    </div>
                  )}
                  
                  <div className="land006-modal-image-counter">
                    {modalImageIndex + 1} / {selectedLand.images.length}
                  </div>
                </div>
              )}
              
              <div className="land006-land-details-grid">
                <div className="land006-detail-item">
                  <span className="land006-detail-label">Location</span>
                  <span className="land006-detail-value">{selectedLand.location}</span>
                </div>
                <div className="land006-detail-item">
                  <span className="land006-detail-label">Size</span>
                  <span className="land006-detail-value">{selectedLand.area}</span>
                </div>
                <div className="land006-detail-item">
                  <span className="land006-detail-label">Type</span>
                  <span className="land006-detail-value">{selectedLand.type}</span>
                </div>
              </div>
  
              {selectedLand.description && (
                <div className="land006-land-description">
                  <h3>Description</h3>
                  <p>{selectedLand.description}</p>
                </div>
              )}
  
              {selectedLand.features && selectedLand.features.length > 0 && (
                <div className="land006-land-features">
                  <h3>Features</h3>
                  <ul className="land006-features-list">
                    {selectedLand.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
  
            <div className="land006-modal-footer">
              <button 
                className="land006-inquiry-btn"
                onClick={() => {
                  setSelectedLand(null);
                  handleProceedToInquiry(selectedLand);
                }}
              >
                Make Inquiry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandSellingPage;