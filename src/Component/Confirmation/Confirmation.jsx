import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Confirmation.css';

const Confirmation = () => {
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState(null);
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const transactionDetails = JSON.parse(localStorage.getItem('transactionDetails'));
    const propertyDetails = JSON.parse(localStorage.getItem('selectedProperty'));
    setTransaction(transactionDetails);
    setProperty(propertyDetails);
  }, []);

  return (
    <div className="confirmation-container">
      <div className="confirmation-card">
        <div className="success-icon">✓</div>
        <h1>Payment Successful!</h1>
        
        {property && (
          <div className="purchase-details">
            <h2>Property Details</h2>
            <p className="property-title">{property.title}</p>
            <p className="property-price">Price: ${property.price.toLocaleString()}</p>
            <p className="property-location">{property.location}</p>
          </div>
        )}

        {transaction && (
          <div className="transaction-details">
            <h2>Transaction Details</h2>
            <p>Transaction ID: {transaction.transaction_id}</p>
            <p>Payment Method: {transaction.payment_type}</p>
            <p>Date: {new Date().toLocaleDateString()}</p>
          </div>
        )}

        <div className="confirmation-actions">
          <button 
            className="home-button"
            onClick={() => navigate('/')}
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;