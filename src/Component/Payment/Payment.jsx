import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import './Payment.css';

const Payment = () => {
  const navigate = useNavigate();
  const { propertyId } = useParams();
  const [property, setProperty] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const checkoutDetails = JSON.parse(localStorage.getItem('checkoutDetails'));
    const selectedProperty = JSON.parse(localStorage.getItem('selectedProperty'));
    
    setProperty(selectedProperty);
    setCustomerInfo({
      name: checkoutDetails.customerInfo.fullName,
      email: checkoutDetails.customerInfo.email,
      phone: checkoutDetails.customerInfo.phoneNumber
    });

    // Calculate total amount including additional services
    let total = 0;
    if (selectedProperty) {
      // Parse property price
      const propertyPrice = typeof selectedProperty.price === 'string'
        ? parseFloat(selectedProperty.price.replace(/[^0-9.-]+/g, ''))
        : selectedProperty.price;
      
      total = propertyPrice || 0;

      // Add additional services if selected
      if (checkoutDetails.surveyPaper) total += 500000;
      if (checkoutDetails.certificateOfOccupancy) total += 750000;
      if (checkoutDetails.buildingEngineering) total += 1000000;
    }

    setTotalAmount(total);
  }, []);

  const config = {
    public_key: 'FLWPUBK_TEST-f9456fd4f3127c0ddf92c26b35f7db33-X',
    tx_ref: `tx-${Date.now()}`,
    amount: totalAmount,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: customerInfo.email,
      phone_number: customerInfo.phone,
      name: customerInfo.name,
    },
    customizations: {
      title: 'Property Purchase',
      description: `Payment for ${property?.title || 'Property'}`,
      logo: 'https://example.com/logo.png', // Replace with your actual logo URL
    },
    secret_key: 'FLWSECK_TEST-9af1eb815471910e75ca7ed7b22ffa78-X'
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handlePayment = () => {
    // Validate customer information before payment
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      alert('Please fill in all customer information');
      return;
    }

    handleFlutterPayment({
      callback: (response) => {
        if (response.status === 'successful') {
          // Save transaction details
          localStorage.setItem('transactionDetails', JSON.stringify(response));
          // Close payment modal
          closePaymentModal();
          // Navigate to confirmation page
          navigate('/confirmation');
        } else {
          alert('Payment was not successful');
        }
      },
      onClose: () => {
        alert('Payment process was cancelled');
      },
    });
  };

  return (
    <div className="payment-container">
      <div className="payment-card">
        <h1>Complete Your Purchase</h1>
        
        {property && (
          <div className="property-summary">
            <h2>{property.title}</h2>
            <p className="price">Price: ₦{totalAmount.toLocaleString()}</p>
            <p>{property.location}</p>
          </div>
        )}

        <div className="customer-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              value={customerInfo.name}
              onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={customerInfo.email}
              onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              value={customerInfo.phone}
              onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
              required
            />
          </div>

          <div className="button-group">
            <button 
              className="back-button"
              onClick={() => navigate('/')}
            >
              Back to Listings
            </button>
            <button 
              className="pay-button"
              onClick={handlePayment}
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;