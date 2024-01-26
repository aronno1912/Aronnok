// Sidebar.jsx

import React from 'react';
import { Link,useLocation  } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    const location = useLocation();
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
          <Link to="/admin/orderlist" className={location.pathname === '/admin/orderlist' ? 'active' : ''}>Order List</Link>
        </li>
        <li>
          <Link to="/admin/sell-requests">Sell Requests</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
