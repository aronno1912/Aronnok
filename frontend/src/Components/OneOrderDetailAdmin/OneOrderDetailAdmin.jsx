// OneOrderDetail.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './OneOrderDetailAdmin.css';



const OneOrderDetailAdmin = ({ orderId }) => {
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {

        const response = await axios.get(`http://localhost:8000/api/order/particularOrder/${orderId}`);


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

        <p>Name: {orderDetails.username}</p>
        {/* <p>Email: {orderDetails.buyerEmail}</p> */}

        {/* Add more customer information as needed */}
      </div>

      {/* Order Status */}
      <div className='info-box'>
        <h2>Order Status</h2>

        <p>Status: {orderDetails.status}</p>

        {/* Add more order status information as needed */}
      </div>

      {/* Delivery Information */}
      <div className='info-box'>
        <h2>Delivery Information</h2>

        <p>Address: {orderDetails.address}</p>
        <p>Placed On : {orderDetails.placedOn}</p>
        <p>Delivery Fee: {orderDetails.deliveryFee}</p>

        {/* Add more delivery information as needed */}
      </div>

      {/* Ordered Products */}
      <div className='order-items'>
        <h2>Ordered Products</h2>
        <table>
          <thead>
            <tr>
              <th>Product</th>

              <th></th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.products.map((product) => (
              <tr key={product.productId}>
                <td>
                <img src='/bansai.jpg' alt='' style={{ width: '50px', height: '50px' }} />
                </td>
                <td>{product.productName}</td>
                <td>{product.quantity}</td>
                <td>${product.subtotal}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OneOrderDetailAdmin;
