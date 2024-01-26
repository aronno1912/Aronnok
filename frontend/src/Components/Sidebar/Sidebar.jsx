// Sidebar.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      
      <ul>
        <li>
          <Link to="/admin/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/admin/all-products">All Products</Link>
        </li>
        <li>
          <Link to="/admin/order-list">Order List</Link>
        </li>
        <li>
          <Link to="/admin/sell-requests">Sell Requests</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
