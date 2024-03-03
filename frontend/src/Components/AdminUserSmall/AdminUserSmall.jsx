import React from 'react'
import './AdminUserSmall.css'
import { Link } from 'react-router-dom'

const AdminUserSmall = (prod) => {
  return (
    <div>
       <Link to={`/admin/viewprofile/${prod.id}`}className='container-link' style={{ textDecoration: 'none', color: 'black' }}>
    <div className='usersmall-container'> 
      <img src={prod.photo} alt=""/>

      <div className="usersmall-details">
        <p className='auction-name' style={{color:"black"}}>{prod.firstname} {prod.lastname}</p>
        <p className='auction-name' style={{color:"black"}}>Username: {prod.username}</p>
      </div>

    </div>
    </Link>
    </div>
  )
}

export default AdminUserSmall
