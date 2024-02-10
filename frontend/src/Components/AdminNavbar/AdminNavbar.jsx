import React from 'react';
import './AdminNavbar.css';

const AdminNavbar = () => {
  return (
    <div className="admin-navbar">
      <div className="left-section">
      <div className="logo">
  <img src="/aronnok-logo.png" alt="logo" style={{ width: '50px', height: '50px' }} />
</div>
        <div className="admin-name">Aronnok</div>
      </div>
      <div className="right-section">
        <div className="adminnotification-icon">🔔</div>
        <div className="adminsearch-bar">
          <input type="text" placeholder="Search" />
          <button className= "adminsearchbutton"type="button">Search</button>
        </div>
        {/* <div className="profile-icon">👤</div> */}
        <div className="adminprofile-icon">
            <img src="/us.png" alt="profile-icon" style={{ width: '50px', height: '50px' }} />
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
