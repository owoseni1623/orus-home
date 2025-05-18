import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BuyPage.css';

const BuyPage = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [selectedType, setSelectedType] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000000 });
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('price-low');
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    // Simulated API call with more realistic data
    const mockProperties = [
      // Homes
      {
        id: 'h1',
        type: 'home',
        title: 'Modern Luxury Villa',
        price: 1250000,
        location: 'Beverly Hills, CA',
        bedrooms: 5,
        bathrooms: 4.5,
        size: 4200,
        yearBuilt: 2022,
        features: ['Smart Home System', 'Pool', 'Solar Panels'],
        image: '/Images/orus00.jpeg',
        description: 'Ultra-modern villa with panoramic city views'
      },
      {
        id: 'h2',
        type: 'home',
        title: 'Coastal Paradise Estate',
        price: 2750000,
        location: 'Malibu, CA',
        bedrooms: 6,
        bathrooms: 5,
        size: 5500,
        yearBuilt: 2021,
        features: ['Beachfront', 'Wine Cellar', 'Home Theater'],
        image: '/Images/orus01.jpg',
        description: 'Beachfront property with private access'
      },
      {
        id: 'h3',
        type: 'home',
        title: 'Urban Smart Home',
        price: 890000,
        location: 'Santa Monica, CA',
        bedrooms: 3,
        bathrooms: 2.5,
        size: 2200,
        yearBuilt: 2023,
        features: ['EV Charging', 'Rooftop Garden', 'Smart Security'],
        image: '/Images/orus02.jpg',
        description: 'Modern smart home with eco-friendly features'
      },
      {
        id: 'h4',
        type: 'home',
        title: 'Mountain View Retreat',
        price: 1650000,
        location: 'Hollywood Hills, CA',
        bedrooms: 4,
        bathrooms: 3.5,
        size: 3800,
        yearBuilt: 2020,
        features: ['Infinity Pool', 'Guest House', 'Home Gym'],
        image: '/Images/orus03.jpg',
        description: 'Spectacular mountain views with modern amenities'
      },
      {
        id: 'h5',
        type: 'home',
        title: 'Downtown Penthouse',
        price: 3200000,
        location: 'Los Angeles, CA',
        bedrooms: 4,
        bathrooms: 4,
        size: 4000,
        yearBuilt: 2022,
        features: ['360° Views', 'Private Elevator', 'Smart Home'],
        image: '/Images/orus04.jpg',
        description: 'Luxury penthouse with city views'
      },
      {
        id: 'h6',
        type: 'home',
        title: 'Suburban Family Estate',
        price: 975000,
        location: 'Sherman Oaks, CA',
        bedrooms: 5,
        bathrooms: 3,
        size: 3200,
        yearBuilt: 2021,
        features: ['Large Backyard', 'Solar Power', 'Smart Kitchen'],
        image: '/Images/orus05.jpeg',
        description: 'Perfect family home in quiet neighborhood'
      },
      // Land Properties
      {
        id: 'l1',
        type: 'land',
        title: 'Oceanfront Development Plot',
        price: 5500000,
        location: 'Pacific Palisades, CA',
        size: 12000,
        zoning: 'Residential',
        features: ['Ocean Views', 'Utilities Ready', 'Permits Available'],
        image: '/Images/land.jpg',
        description: 'Prime oceanfront development opportunity'
      },
      {
        id: 'l2',
        type: 'land',
        title: 'Commercial Corner Lot',
        price: 2800000,
        location: 'Downtown LA',
        size: 8500,
        zoning: 'Commercial',
        features: ['Corner Property', 'High Traffic', 'Mixed-Use Potential'],
        image: '/Images/land0.jpg',
        description: 'Prime commercial development opportunity'
      },
      {
        id: 'l3',
        type: 'land',
        title: 'Hillside Estate Lot',
        price: 1950000,
        location: 'Bel Air, CA',
        size: 15000,
        zoning: 'Residential',
        features: ['City Views', 'Gated Community', 'Architectural Plans'],
        image: '/Images/land1.jpeg',
        description: 'Build your dream home with city views'
      },
      {
        id: 'l4',
        type: 'land',
        title: 'Vineyard Development',
        price: 4200000,
        location: 'Napa Valley, CA',
        size: 250000,
        zoning: 'Agricultural',
        features: ['Wine Country', 'Water Rights', 'Road Access'],
        image: '/Images/land2.jpg',
        description: 'Perfect for vineyard development'
      },
      {
        id: 'l5',
        type: 'land',
        title: 'Mountain Development Site',
        price: 1200000,
        location: 'Big Bear, CA',
        size: 18000,
        zoning: 'Mixed-Use',
        features: ['Mountain Views', 'Ski Resort Proximity', 'Utilities'],
        image: '/Images/land3.jpg',
        description: 'Premium mountain development opportunity'
      },
      {
        id: 'l6',
        type: 'land',
        title: 'Ranch Development',
        price: 3500000,
        location: 'Santa Barbara, CA',
        size: 180000,
        zoning: 'Agricultural/Residential',
        features: ['Rolling Hills', 'Natural Springs', 'Development Ready'],
        image: '/Images/land4.jpeg',
        description: 'Expansive ranch property with development potential'
      }
    ];

    setTimeout(() => {
      setProperties(mockProperties);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handlePropertyClick = (property) => {
    localStorage.setItem('selectedProperty', JSON.stringify(property));
    navigate(`/checkout/${property.id}`);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    let sortedProperties = [...properties];
    
    switch(value) {
      case 'price-low':
        sortedProperties.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sortedProperties.sort((a, b) => b.price - a.price);
        break;
      case 'size-low':
        sortedProperties.sort((a, b) => a.size - b.size);
        break;
      case 'size-high':
        sortedProperties.sort((a, b) => b.size - a.size);
        break;
      default:
        break;
    }
    
    setProperties(sortedProperties);
  };

  const filteredProperties = properties.filter(property => {
    const matchesType = selectedType === 'all' || property.type === selectedType;
    const matchesPrice = property.price >= priceRange.min && property.price <= priceRange.max;
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesPrice && matchesSearch;
  });

  if (isLoading) {
    return <div className="buy-page-loader">Loading properties...</div>;
  }

  return (
    <div className="buy-page">
      <div className="buy-page-header">
        <h1>Find Your Perfect Property</h1>
        <p>Discover amazing homes and land opportunities</p>
      </div>

      <div className="filters-panel">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by location or title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-options">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Properties</option>
            <option value="home">Homes</option>
            <option value="land">Land</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="filter-select"
          >
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="size-low">Size: Small to Large</option>
            <option value="size-high">Size: Large to Small</option>
          </select>

          <div className="price-range-inputs">
            <input
              type="number"
              placeholder="Min Price"
              value={priceRange.min}
              onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
            />
            <span>to</span>
            <input
              type="number"
              placeholder="Max Price"
              value={priceRange.max}
              onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
            />
          </div>

          <div className="view-toggle">
            <button 
              className={viewMode === 'grid' ? 'active' : ''}
              onClick={() => setViewMode('grid')}
            >
              Grid
            </button>
            <button 
              className={viewMode === 'list' ? 'active' : ''}
              onClick={() => setViewMode('list')}
            >
              List
            </button>
          </div>
        </div>
      </div>

      <div className={`properties-container ${viewMode}`}>
        {filteredProperties.map(property => (
          <div 
            key={property.id} 
            className="property-card"
            onClick={() => handlePropertyClick(property)}
          >
            <div className="property-image">
              <img src={property.image} alt={property.title} />
              <div className="property-type-tag">
                {property.type === 'home' ? 'Home' : 'Land'}
              </div>
            </div>

            <div className="property-details">
              <h3>{property.title}</h3>
              <div className="property-price">
                ${property.price.toLocaleString()}
              </div>
              <div className="property-location">
                <i className="location-icon"></i>
                {property.location}
              </div>

              {property.type === 'home' && (
                <div className="home-specs">
                  <span>{property.bedrooms} Beds</span>
                  <span>{property.bathrooms} Baths</span>
                  <span>{property.size.toLocaleString()} sq ft</span>
                  <span>Built {property.yearBuilt}</span>
                </div>
              )}

              {property.type === 'land' && (
                <div className="land-specs">
                  <span>{property.size.toLocaleString()} sq ft</span>
                  <span>{property.zoning}</span>
                </div>
              )}

              <div className="property-features">
                {property.features.map((feature, index) => (
                  <span key={index} className="feature-tag">
                    {feature}
                  </span>
                ))}
              </div>

              <p className="property-description">{property.description}</p>
            </div>
          </div>
        ))}
      </div>

      {filteredProperties.length === 0 && (
        <div className="no-results">
          <h3>No properties found</h3>
          <p>Try adjusting your filters to see more results</p>
        </div>
      )}
    </div>
  );
};

export default BuyPage;