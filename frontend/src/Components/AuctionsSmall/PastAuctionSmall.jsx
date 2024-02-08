import React from 'react'
import './AuctionSmall.css'
import { Link } from 'react-router-dom'

const PastAuctionSmall = (prod) => {
    
    const start = new Date(prod.startTime);
    const end = new Date(prod.endTime);
  return (
    
         <Link to={`/admin/viewauctions/${prod.status}/${prod.id}`}className='container-link' style={{ textDecoration: 'none', color: 'black' }}>
    <div className='auction-container'> 
      <img src={prod.photo} alt="" style={{ width: '280px', height: '200px' }} />

      <div className="auction-details">
        <p className='auction-name'>{prod.name}</p>
        <p className='auction-name'>{prod.date.substring(0, 10)}</p>
    
        <p style={{color: "rgb(208, 233, 237)"}}><b>Time: {start.getHours().toString().padStart(2, '0')}:{start.getMinutes().toString().padStart(2, '0')}:{start.getSeconds().toString().padStart(2, '0')} - {end.getHours().toString().padStart(2, '0')}:
        {end.getMinutes().toString().padStart(2, '0')}:{end.getSeconds().toString().padStart(2, '0')}</b></p>
      </div>
    </div>
    </Link>
  )
}

export default PastAuctionSmall