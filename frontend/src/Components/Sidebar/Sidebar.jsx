// Sidebar.jsx

import React from 'react';
import { Link,useLocation  } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    const location = useLocation();
  return (
    <div className="sidebar">
      
      <ul>
        <li className='eta1'>
          <Link to="/admin/" className={location.pathname === '/admin/dashboard' ? 'active' : ''}>Dashboard</Link>
        </li>
        <li className='eta2'>
          <Link to="/admin/allproducts" className={location.pathname === '/admin/allproducts' ? 'active' : ''}>All Products</Link>
        </li>

        <li className='eta3'>
          <Link to="/admin/orderlist" className={location.pathname.startsWith('/admin/orderlist') ? 'active' : ''}>Order List</Link>

        </li>
        <li className='eta4'>
          <Link to="/admin/viewsellrequests" className={location.pathname === '/admin/viewsellrequests' ? 'active' : ''}>Sell Requests</Link>
        </li>

        <li className='eta5'>
          <Link to="/admin/createauction" className={location.pathname === '/admin/createauction' ? 'active' : ''}>Create Auction</Link>
        </li>
        <li className='eta6'>
          <Link to="/admin/viewauctions" className={location.pathname.startsWith('/admin/viewauctions') ? 'active' : ''}>View Auctions</Link>
        </li>

        <li className='eta6'>
          <Link to="/admin/allproducts/addplant" className={location.pathname.startsWith('/admin/allproducts/addplant') ? 'active' : ''}>Add Product</Link>
        </li>

        <li className='eta7'>
          <Link to="/"> <img src='/logout2.png' ></img>LogOut</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
