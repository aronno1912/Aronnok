// OneOrderDetail.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OneOrderDetail.css';

const OneOrderDetailAdmin = ({ orderId }) => {
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/order/details/${orderId}`);
        setOrderDetails(response.data);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (!orderDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className='one-order-detail'>
      {/* Customer Information */}
      <div className='info-box'>
        <h2>Customer Information</h2>
        <p>Name: {orderDetails.buyerName}</p>
        <p>Email: {orderDetails.buyerEmail}</p>
        {/* Add more customer information as needed */}
      </div>

      {/* Order Status */}
      <div className='info-box'>
        <h2>Order Status</h2>
        <p>Status: {orderDetails.orderStatus}</p>
        {/* Add more order status information as needed */}
      </div>

      {/* Delivery Information */}
      <div className='info-box'>
        <h2>Delivery Information</h2>
        <p>Address: {orderDetails.deliveryAddress}</p>
        <p>Estimated Delivery Date: {orderDetails.estimatedDeliveryDate}</p>
        {/* Add more delivery information as needed */}
      </div>

      {/* Ordered Products */}
      <div className='order-items'>
        <h2>Ordered Products</h2>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.items.map((item) => (
              <tr key={item.productId}>
                <td>{item.productName}</td>
                <td>{item.quantity}</td>
                <td>${item.price}</td>
                <td>${item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OneOrderDetailAdmin;
