import React, { useState } from 'react';
import './PropertyListing.css'

const PropertyListing = () => {
  const [activeCategory, setActiveCategory] = useState('homes-sale');
  const [filters, setFilters] = useState({
    propertyType: '',
    priceRange: '',
    bedrooms: '',
    location: '',
    lotSize: '',
    yearBuilt: '',
    amenities: [],
    status: 'all'
  });

  const [sortBy, setSortBy] = useState('newest');

  // Enhanced sample data with more property types and categories
  const properties = [
    // HOMES FOR SALE
    {
      id: 1,
      category: 'homes-sale',
      title: "Luxury Beachfront Villa",
      price: 2250000,
      location: "Miami Beach, Florida",
      bedrooms: 5,
      bathrooms: 4.5,
      area: 4200,
      lotSize: "0.5 acres",
      type: "Villa",
      image: "/Images/orus00.jpeg",
      features: ["Private Pool", "Ocean View", "Smart Home", "Wine Cellar"],
      status: "For Sale",
      yearBuilt: 2020,
      parkingSpaces: 3,
      amenities: ["Security System", "Central AC", "Theater Room", "Gym"]
    },
    {
      id: 2,
      category: 'homes-sale',
      title: "Modern Mountain Estate",
      price: 1850000,
      location: "Aspen, Colorado",
      bedrooms: 4,
      bathrooms: 3.5,
      area: 3800,
      lotSize: "0.75 acres",
      type: "Single Family",
      image: "/Images/orus001.jpeg",
      features: ["Mountain Views", "Heated Driveway", "Fireplace", "Gourmet Kitchen"],
      status: "For Sale",
      yearBuilt: 2019,
      parkingSpaces: 2,
      amenities: ["Radiant Heat", "Smart Home", "Wine Room", "Ski Room"]
    },
    {
      id: 3,
      category: 'homes-sale',
      title: "Historic Downtown Brownstone",
      price: 3100000,
      location: "Boston, Massachusetts",
      bedrooms: 5,
      bathrooms: 4,
      area: 4500,
      lotSize: "0.1 acres",
      type: "Townhouse",
      image: "/Images/orus04.jpg",
      features: ["Original Details", "Garden", "Roof Deck", "Multiple Fireplaces"],
      status: "For Sale",
      yearBuilt: 1890,
      parkingSpaces: 2,
      amenities: ["Updated Systems", "Designer Kitchen", "Home Office", "Wine Cellar"]
    },
    {
      id: 4,
      category: 'homes-sale',
      title: "Contemporary City Penthouse",
      price: 4500000,
      location: "San Francisco, California",
      bedrooms: 3,
      bathrooms: 3.5,
      area: 3200,
      lotSize: "N/A",
      type: "Penthouse",
      image: "/Images/orus05.jpeg",
      features: ["360° Views", "Private Elevator", "Smart Home", "Chef's Kitchen"],
      status: "For Sale",
      yearBuilt: 2021,
      parkingSpaces: 3,
      amenities: ["24/7 Security", "Concierge", "Spa", "Fitness Center"]
    },
    {
      id: 5,
      category: 'homes-sale',
      title: "Lakefront Family Home",
      price: 1450000,
      location: "Lake Tahoe, Nevada",
      bedrooms: 4,
      bathrooms: 3,
      area: 3000,
      lotSize: "0.3 acres",
      type: "Single Family",
      image: "/Images/orus5.webp",
      features: ["Lake Access", "Dock", "Deck", "Stone Fireplace"],
      status: "For Sale",
      yearBuilt: 2015,
      parkingSpaces: 2,
      amenities: ["Boat Slip", "Central AC", "Game Room", "Workshop"]
    },
    {
      id: 6,
      category: 'homes-sale',
      title: "Spanish Colonial Revival",
      price: 2750000,
      location: "Santa Barbara, California",
      bedrooms: 4,
      bathrooms: 4.5,
      area: 3600,
      lotSize: "0.4 acres",
      type: "Single Family",
      image: "/Images/orus6.jpg",
      features: ["Courtyard", "Tile Roof", "Arched Windows", "Ocean Views"],
      status: "For Sale",
      yearBuilt: 1925,
      parkingSpaces: 2,
      amenities: ["Pool", "Guest House", "Wine Cellar", "Outdoor Kitchen"]
    },
  
    // LAND FOR SALE
    {
      id: 7,
      category: 'land-sale',
      title: "Prime Development Land",
      price: 3500000,
      location: "Austin, Texas",
      lotSize: "5 acres",
      type: "Commercial Land",
      image: "/Images/land.jpg",
      features: ["Corner Lot", "Utilities Ready", "Mixed-Use Zoning", "High Traffic Area"],
      status: "For Sale",
      zoning: "Mixed-Use",
      utilities: ["Water", "Electricity", "Sewage", "Natural Gas"],
      topography: "Flat",
      roadAccess: "Multiple Access Points"
    },
    {
      id: 8,
      category: 'land-sale',
      title: "Oceanfront Development Parcel",
      price: 5500000,
      location: "Maui, Hawaii",
      lotSize: "2.5 acres",
      type: "Residential Land",
      image: "/Images/land0.jpg",
      features: ["Ocean Views", "Beach Access", "Utilities Ready", "Permitted"],
      status: "For Sale",
      zoning: "Residential",
      utilities: ["Water", "Electricity"],
      topography: "Sloped",
      roadAccess: "Private Road"
    },
    {
      id: 9,
      category: 'land-sale',
      title: "Mountain Building Site",
      price: 895000,
      location: "Vail, Colorado",
      lotSize: "1.2 acres",
      type: "Residential Land",
      image: "/Images/land1.jpeg",
      features: ["Mountain Views", "Ski Access", "Wooded", "Utilities"],
      status: "For Sale",
      zoning: "Residential",
      utilities: ["Well", "Septic"],
      topography: "Sloped",
      roadAccess: "Year-round"
    },
    {
      id: 10,
      category: 'land-sale',
      title: "Agricultural Investment Property",
      price: 2200000,
      location: "Napa Valley, California",
      lotSize: "25 acres",
      type: "Agricultural Land",
      image: "/Images/land2.jpg",
      features: ["Vineyard Potential", "Water Rights", "Rich Soil", "Valley Views"],
      status: "For Sale",
      zoning: "Agricultural",
      utilities: ["Irrigation", "Well"],
      topography: "Rolling Hills",
      roadAccess: "County Road"
    },
    {
      id: 11,
      category: 'land-sale',
      title: "Industrial Development Site",
      price: 1750000,
      location: "Phoenix, Arizona",
      lotSize: "3.5 acres",
      type: "Industrial Land",
      image: "/Images/land3.jpg",
      features: ["Rail Access", "Highway Frontage", "Utilities", "Level"],
      status: "For Sale",
      zoning: "Industrial",
      utilities: ["Full Infrastructure"],
      topography: "Flat",
      roadAccess: "Highway Access"
    },
    {
      id: 12,
      category: 'land-sale',
      title: "Lakefront Building Lot",
      price: 750000,
      location: "Lake George, New York",
      lotSize: "0.8 acres",
      type: "Residential Land",
      image: "/Images/land4.jpeg",
      features: ["Lake Frontage", "Dock Permit", "Utilities", "Views"],
      status: "For Sale",
      zoning: "Residential",
      utilities: ["Public Water", "Electricity"],
      topography: "Gentle Slope",
      roadAccess: "Private Road"
    },
  
    // HOMES FOR RENT
    {
      id: 13,
      category: 'homes-rent',
      title: "Luxury High-Rise Apartment",
      price: 5500,
      location: "Manhattan, New York",
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      type: "Apartment",
      image: "/Images/rent.jpg",
      features: ["Doorman", "City Views", "Modern Kitchen", "Gym Access"],
      status: "For Rent",
      leaseTerm: "12 months",
      furnished: true,
      utilities: ["Water", "Heat"],
      parkingAvailable: true
    },
    {
      id: 14,
      category: 'homes-rent',
      title: "Beachside Cottage",
      price: 3800,
      location: "San Diego, California",
      bedrooms: 3,
      bathrooms: 2,
      area: 1500,
      type: "House",
      image: "/Images/rent0.jpg",
      features: ["Beach Access", "Patio", "Garage", "Updated Kitchen"],
      status: "For Rent",
      leaseTerm: "12 months",
      furnished: false,
      utilities: ["Gardener"],
      parkingAvailable: true
    },
    {
      id: 15,
      category: 'homes-rent',
      title: "Modern Townhouse",
      price: 4200,
      location: "Seattle, Washington",
      bedrooms: 3,
      bathrooms: 2.5,
      area: 1800,
      type: "Townhouse",
      image: "/Images/rent1.webp",
      features: ["Rooftop Deck", "City Views", "Garage", "Smart Home"],
      status: "For Rent",
      leaseTerm: "12-24 months",
      furnished: false,
      utilities: ["None"],
      parkingAvailable: true
    },
    {
      id: 16,
      category: 'homes-rent',
      title: "Suburban Family Home",
      price: 3500,
      location: "Austin, Texas",
      bedrooms: 4,
      bathrooms: 3,
      area: 2200,
      type: "House",
      image: "/Images/rent2.webp",
      features: ["Large Yard", "Pool", "Two-Car Garage", "Office"],
      status: "For Rent",
      leaseTerm: "12 months",
      furnished: false,
      utilities: ["Lawn Care"],
      parkingAvailable: true
    },
    {
      id: 17,
      category: 'homes-rent',
      title: "Downtown Loft",
      price: 2800,
      location: "Chicago, Illinois",
      bedrooms: 1,
      bathrooms: 1,
      area: 1000,
      type: "Loft",
      image: "/Images/rent3.webp",
      features: ["High Ceilings", "Exposed Brick", "Updated Kitchen", "City Views"],
      status: "For Rent",
      leaseTerm: "12 months",
      furnished: false,
      utilities: ["Heat"],
      parkingAvailable: false
    },
    {
      id: 18,
      category: 'homes-rent',
      title: "Golf Course Villa",
      price: 4500,
      location: "Scottsdale, Arizona",
      bedrooms: 3,
      bathrooms: 2.5,
      area: 2000,
      type: "Villa",
      image: "/Images/rent4.jpg",
      features: ["Golf Views", "Community Pool", "Garage", "Patio"],
      status: "For Rent",
      leaseTerm: "12 months",
      furnished: true,
      utilities: ["HOA"],
      parkingAvailable: true
    },
  
    // LAND FOR RENT/LEASE
    {
      id: 19,
      category: 'land-rent',
      title: "Agricultural Land Lease",
      price: 2000,
      location: "Sacramento Valley, CA",
      lotSize: "50 acres",
      type: "Agricultural",
      image: "/Images/lease.jpg",
      features: ["Irrigation", "Rich Soil", "Equipment Storage", "Road Access"],
      status: "For Lease",
      leaseTerm: "Annual",
      soilType: "Class 1 Farmland",
      waterRights: true,
      zoning: "Agricultural"
    },
    {
      id: 20,
      category: 'land-rent',
      title: "Commercial Lot Lease",
      price: 3500,
      location: "Houston, Texas",
      lotSize: "2 acres",
      type: "Commercial",
      image: "/Images/lease0.avif",
      features: ["Highway Frontage", "Paved", "Security", "Utilities"],
      status: "For Lease",
      leaseTerm: "3-5 years",
      zoning: "Commercial",
      utilities: true,
      parking: "Available"
    },
    {
      id: 21,
      category: 'land-rent',
      title: "Industrial Storage Yard",
      price: 4500,
      location: "Portland, Oregon",
      lotSize: "3 acres",
      type: "Industrial",
      image: "/Images/lease1.jpeg",
      features: ["Fenced", "Security", "Loading Area", "Office Space"],
      status: "For Lease",
      leaseTerm: "Annual",
      zoning: "Industrial",
      utilities: true,
      parking: "Truck Accessible"
    },
    {
      id: 22,
      category: 'land-rent',
      title: "Grazing Land Lease",
      price: 1500,
      location: "Montana Grasslands",
      lotSize: "100 acres",
      type: "Ranch Land",
      image: "/Images/lease2.webp",
      features: ["Natural Water", "Fenced", "Grass Feed", "Road Access"],
      status: "For Lease",
      leaseTerm: "Annual",
      soilType: "Grassland",
      waterRights: true,
      zoning: "Agricultural"
    },
    {
      id: 23,
      category: 'land-rent',
      title: "Event Space Lot",
      price: 2500,
      location: "Nashville, Tennessee",
      lotSize: "1.5 acres",
      type: "Commercial",
      image: "/Images/lease3.webp",
      features: ["Parking", "Utilities", "Central Location", "Level Ground"],
      status: "For Lease",
      leaseTerm: "Flexible",
      zoning: "Mixed-Use",
      utilities: true,
      parking: "100+ Spaces"
    },
    {
      id: 24,
      category: 'land-rent',
      title: "Vineyard Land Lease",
      price: 3000,
      location: "Sonoma County, CA",
      lotSize: "15 acres",
      type: "Agricultural",
      image: "/Images/lease4.jpg",
      features: ["Established Vines", "Irrigation", "Equipment Storage", "Processing Area"],
      status: "For Lease",
      leaseTerm: "5 years",
      soilType: "Volcanic",
      waterRights: true,
      zoning: "Agricultural"
    }
  ];

  const categories = [
    { id: 'homes-sale', label: 'Homes for Sale' },
    { id: 'land-sale', label: 'Land for Sale' },
    { id: 'homes-rent', label: 'Homes for Rent' },
    { id: 'land-rent', label: 'Land for Rent/Lease' }
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    // Reset filters when changing categories
    setFilters({
      propertyType: '',
      priceRange: '',
      bedrooms: '',
      location: '',
      lotSize: '',
      yearBuilt: '',
      amenities: [],
      status: 'all'
    });
  };

  const renderFilters = () => {
    switch (activeCategory) {
      case 'homes-sale':
      case 'homes-rent':
        return (
          <div className="filters-container">
            <select name="propertyType" value={filters.propertyType} onChange={handleFilterChange}>
              <option value="">Property Type</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="condo">Condo</option>
            </select>

            <select name="priceRange" value={filters.priceRange} onChange={handleFilterChange}>
              <option value="">Price Range</option>
              <option value="0-2000">$0 - $2,000/mo</option>
              <option value="2000-4000">$2,000 - $4,000/mo</option>
              <option value="4000+">$4,000+/mo</option>
            </select>

            <select name="bedrooms" value={filters.bedrooms} onChange={handleFilterChange}>
              <option value="">Bedrooms</option>
              <option value="studio">Studio</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3+</option>
            </select>

            <select name="yearBuilt" value={filters.yearBuilt} onChange={handleFilterChange}>
              <option value="">Year Built</option>
              <option value="2020+">2020 or newer</option>
              <option value="2010-2019">2010-2019</option>
              <option value="2000-2009">2000-2009</option>
              <option value="pre-2000">Before 2000</option>
            </select>
          </div>
        );

      case 'land-sale':
      case 'land-rent':
        return (
          <div className="filters-container">
            <select name="propertyType" value={filters.propertyType} onChange={handleFilterChange}>
              <option value="">Land Type</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="agricultural">Agricultural</option>
              <option value="industrial">Industrial</option>
            </select>

            <select name="lotSize" value={filters.lotSize} onChange={handleFilterChange}>
              <option value="">Lot Size</option>
              <option value="0-1">0-1 Acre</option>
              <option value="1-5">1-5 Acres</option>
              <option value="5-10">5-10 Acres</option>
              <option value="10+">10+ Acres</option>
            </select>

            <select name="zoning" value={filters.zoning} onChange={handleFilterChange}>
              <option value="">Zoning</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="mixed">Mixed-Use</option>
              <option value="agricultural">Agricultural</option>
            </select>
          </div>
        );

      default:
        return null;
    }
  };

  const renderPropertyCard = (property) => {
    const isLand = property.category.includes('land');

    return (
      <div key={property.id} className="property-card">
        <div className="property-image">
          <img src={property.image} alt={property.title} />
          <span className="property-status">{property.status}</span>
          {property.category.includes('rent') && 
            <span className="property-price-period">per month</span>
          }
        </div>
        <div className="property-details">
          <h3>{property.title}</h3>
          <p className="property-location">
            <i className="fas fa-map-marker-alt"></i> {property.location}
          </p>
          <p className="property-price">
            ${property.price.toLocaleString()}
            {property.category.includes('rent') && <span>/month</span>}
          </p>
          
          {!isLand ? (
            <div className="property-features">
              <span><i className="fas fa-bed"></i> {property.bedrooms} Beds</span>
              <span><i className="fas fa-bath"></i> {property.bathrooms} Baths</span>
              <span><i className="fas fa-ruler-combined"></i> {property.area} sqft</span>
            </div>
          ) : (
            <div className="property-features">
              <span><i className="fas fa-ruler-combined"></i> {property.lotSize}</span>
              <span><i className="fas fa-map"></i> {property.type}</span>
            </div>
          )}

          <div className="property-tags">
            {property.features.slice(0, 3).map((feature, index) => (
              <span key={index} className="feature-tag">{feature}</span>
            ))}
          </div>

          <div className="property-actions">
            <button className="view-details-btn">View Details</button>
            <button className="save-property-btn">
              <i className="far fa-heart"></i>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="property-listing">
      <div className="listing-header">
        <h1>Real Estate Marketplace</h1>
        <p>Find your perfect property from our extensive listings</p>
      </div>

      <div className="category-tabs">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => handleCategoryChange(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="filters-section">
        {renderFilters()}
        
        <div className="sort-container">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="properties-grid">
        {properties
          .filter(property => property.category === activeCategory)
          .map(property => renderPropertyCard(property))}
      </div>

      <div className="pagination">
        <button className="pagination-btn">&lt;</button>
        <button className="pagination-btn active">1</button>
        <button className="pagination-btn">2</button>
        <button className="pagination-btn">3</button>
        <span>...</span>
        <button className="pagination-btn">10</button>
        <button className="pagination-btn">&gt;</button>
      </div>
    </div>
  );
};

export default PropertyListing;