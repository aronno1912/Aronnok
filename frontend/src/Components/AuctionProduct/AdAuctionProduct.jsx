import React from 'react'
import "./AuctionProduct.css"
import { Link } from 'react-router-dom'

const AdAuctionProduct = (prod) => {
    const auctionId = prod.auctionId;
    const productId = prod.id;

  return (
    <div>
       <Link to={`/auction/${auctionId}/${productId}/bids`}className='container-link' style={{ textDecoration: 'none', color: 'black' }}>
        <div className='product-container'> 

        <div className='container'> 
        <img src={prod.photo} alt="" style={{ width: '280px', height: '200px' }} />

        <div className="plant-details">
            <p className='plant-name'>{prod.name}</p>
            <div className="product-description">
                <p>{prod.description}</p>
            </div>
            <p className='product-price'><b>Current Bid: ${prod.currentBid}</b></p>
            <p className='product-price'><b>Highest Bidder: {prod.highestBidder}</b></p>
            <div className="product-footer">
               
            </div>
            </div>
        </div>
        </div>
      </Link>
    </div>
  )
}

export default AdAuctionProduct
