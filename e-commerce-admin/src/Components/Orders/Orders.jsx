import React, { useState, useEffect } from 'react';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from the backend API
    fetch('http://localhost:4000/orders')
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error('Error fetching orders:', error));
  }, []); // Empty dependency array to ensure the effect runs only once

  return (
    <div className="order-list">
      <h2>Order List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>City</th>
            <th>Postal Code</th>
            <th>Country</th>
            <th>Payment Method</th>
            <th>Voucher</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.name}</td>
              <td>{order.email}</td>
              <td>{order.address}</td>
              <td>{order.city}</td>
              <td>{order.postalCode}</td>
              <td>{order.country}</td>
              <td>{order.paymentMethod}</td>
              <td>{order.voucher}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
