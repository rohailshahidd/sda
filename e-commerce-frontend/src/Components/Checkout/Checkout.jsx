import React, { useState } from 'react';
import './Checkout.css';
import { withRouter } from 'react-router-dom';

const Checkout = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
        paymentMethod: 'Credit Card',
        voucher: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.paymentMethod === 'Credit Card') {
            // Redirect to credit card page
            window.location.replace("/ccinfo");
        }

        try {
            const response = await fetch('http://localhost:4000/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                window.alert('Order placed successfully!');
                // You can redirect or show a success message here
            } else {
                console.error('Failed to place order');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="checkout-container">
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <input type="text" name="name" placeholder="Full Name" onChange={handleChange} />
                <input type="email" name="email" placeholder="Email Address" onChange={handleChange} />
                <input type="text" name="address" placeholder="Delivery Address" onChange={handleChange} />
                <input type="text" name="city" placeholder="City" onChange={handleChange} />
                <input type="text" name="postalCode" placeholder="Postal Code" onChange={handleChange} />
                <input type="text" name="country" placeholder="Country" onChange={handleChange} />

                <select name="paymentMethod" onChange={handleChange}>
                    <option value="Credit Card">Credit Card</option>
                    <option value="PayPal">PayPal</option>
                    <option value="Cash on Delivery">Cash on Delivery</option>
                </select>

                <input type="text" name="voucher" placeholder="Discount Voucher" onChange={handleChange} />

                <p>Total Amount: {/* Display total amount here */}</p>
                <button type="submit">Place Order</button>
            </form>
        </div>
    );
};

export default Checkout;
