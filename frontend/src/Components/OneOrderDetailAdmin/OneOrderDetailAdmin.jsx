// OneOrderDetail.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './OneOrderDetailAdmin.css';




const OneOrderDetailAdmin = ({ orderId }) => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [newStatus, setNewStatus] = useState('');

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
  console.log('here we go');

  const handleStatusChange = async () => {
    try {
      console.log('Order status update started');
      await axios.put(`http://localhost:8000/api/order/${orderId}`, { status: newStatus });
      // Update the local state or fetch the order details again if needed
      console.log('Order status updated successfully', newStatus);
      window.location.reload();
    } catch (error) {
      console.error('Error updating order status:', error);
      console.log('Order status update failed', newStatus);
    }
  };
  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing':
        return '#FFD700'; // Yellow for Processing
      case 'Delivered':
        return '#00FF00'; // Green for Delivered
      case 'On Transit':
        return '#800080'; // Purple for On Transit
      case 'Canceled':
        return '#FF0000'; // Red for Canceled
      default:
        return '#FFFFFF'; // Default color
    }
  };

  if (!orderDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className='one-order-detail'>
         <div className='order-id-status'>
      <div className='order-id'>
        <h2>Order ID: {orderDetails._id}</h2>
      </div>
      <div className='order-status' style={{ backgroundColor: getStatusColor(orderDetails.status) }}>
        <span className='status-tag'>{orderDetails.status}</span>
      </div>
    </div>
     
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
        <p>Status :       
          <select
            value={newStatus || orderDetails.status}
            onChange={(e) => setNewStatus(e.target.value)}
          >
            <option value="Processing">Processing</option>
            <option value="Delivered">Delivered</option>
            <option value="On Transit">On Transit</option>
            <option value="Canceled">Canceled</option>
          </select>
          <button onClick={handleStatusChange}>Update Status</button>
          
        </p>
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
              <th style={{ border: 'none' }}>Product</th>

              <th style={{ border: 'none' }}></th>
              <th style={{ border: 'none' }}>Quantity</th>
              <th style={{ border: 'none' }}>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.products.map((product) => (
             
              <tr key={product.productId}>
                <td style={{ border: 'none' }}>
                <img src={product.productPhoto} alt='' style={{ width: '50px', height: '50px' }} />
                </td>
                <td style={{ border: 'none' }}>{product.productName}</td>
                <td style={{ border: 'none' }}>{product.quantity}</td>
                <td style={{ border: 'none' }}>${product.subtotal}</td>

              </tr>
            ))}
              <tr>
              <td colSpan="3" style={{ textAlign: 'right' }}>Total:</td>
              <td  >${orderDetails.amount}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OneOrderDetailAdmin;
