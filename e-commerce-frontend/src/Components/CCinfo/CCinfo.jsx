import React, { useState } from 'react';
import './CCinfo.css';

const CreditCardForm = ({ history }) => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expirationDate: '',
    cvv: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateCardNumber = () => {
    // Implement your card number validation logic
    return /^[0-9]{16}$/.test(formData.cardNumber);
  };

  const validateExpirationDate = () => {
    // Implement your expiration date validation logic
    return /^\d{2}\/\d{4}$/.test(formData.expirationDate);
  };

  const validateCVV = () => {
    // Implement your CVV validation logic
    return /^[0-9]{3}$/.test(formData.cvv);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!validateCardNumber() || !validateExpirationDate() || !validateCVV()) {
      alert('Invalid input. Please check your card details.');
      return;
    }

    // Simulate sending data to the server (you should do this securely on the server side)
    try {
      const response = await fetch('http://localhost:4000/ccinfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Credit card info stored successfully!');
        alert('Order placed successfully!');
        // Redirect to the main page
        window.location.replace('/');
      } else {
        console.error('Failed to store credit card info');
        alert('Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="credit-card-form">
      <form onSubmit={handleSubmit}>
        <label>
          Card Number:
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            maxLength="16"
          />
        </label>
        <label>
          Card Holder:
          <input
            type="text"
            name="cardHolder"
            value={formData.cardHolder}
            onChange={handleChange}
          />
        </label>
        <label>
          Expiration Date:
          <input
            type="text"
            name="expirationDate"
            value={formData.expirationDate}
            onChange={handleChange}
            placeholder="MM/YYYY"
          />
        </label>
        <label>
          CVV:
          <input
            type="text"
            name="cvv"
            value={formData.cvv}
            onChange={handleChange}
            maxLength="3"
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreditCardForm;
