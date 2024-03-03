// Sidebar.jsx

import React from 'react';
import { Link,useLocation  } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    const location = useLocation();
  return (
    <div className="sidebar">
      
      <ul style={{marginLeft:'-17px'}}>
        <li className='eta1' >
          <Link to="/admin/dashboard" className={location.pathname === '/admin/dashboard' ? 'active' : ''}><i class="bi bi-list" style={{padding:'10px'}}></i>Dashboard</Link>
        </li>
        <li className='eta2'>
          <Link to="/admin/allproducts" className={location.pathname === '/admin/allproducts' ? 'active' : ''}><i className="bi bi-basket" style={{padding:'10px'}}></i>All Products</Link>
        </li>

        <li className='eta3' >
          <Link to="/admin/orderlist" className={location.pathname.startsWith('/admin/orderlist') ? 'active' : ''}><i class="bi bi-list-task" style={{padding:'10px'}}></i>Order List</Link>

        </li>
        <li className='eta4'>
          <Link to="/admin/viewsellrequests" className={location.pathname === '/admin/viewsellrequests' ? 'active' : ''}><i class="bi bi-envelope-paper" style={{padding:'10px'}}></i>Sell Requests</Link>
        </li>

        <li className='eta5'>
          <Link to="/admin/createauction" className={location.pathname === '/admin/createauction' ? 'active' : ''}><i class="bi bi-hammer" style={{padding:'10px'}}></i>Create Auction</Link>
        </li>
        <li className='eta6'>
          <Link to="/admin/viewauctions" className={location.pathname.startsWith('/admin/viewauctions') ? 'active' : ''}><i class="bi bi-view-list" style={{padding:'10px'}}></i>View Auctions</Link>
        </li>

        <li className='eta6'>
          <Link to="/admin/allproducts/addplant" className={location.pathname.startsWith('/admin/allproducts/addplant') ? 'active' : ''}><i class="bi bi-database-add" style={{padding:'10px'}}></i>Add Product</Link>
        </li>

        <li className='eta7'>
          <Link to="/"> <i class="bi bi-box-arrow-left" style={{padding:'10px'}}></i>LogOut</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
