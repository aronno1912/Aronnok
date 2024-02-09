import React, { useState } from 'react'
import "./AuctionProduct.css"
import { Link } from 'react-router-dom'
import BidPopup from '../BidPopup/BidPopup';
import AuctionAddPlant from '../AuctionAddPlant/AuctionAddPlant';

const AuctionProduct = (prod) => {
    const [isPopupOpen, setPopupOpen] = useState(false);

    const openPopup = () => {
        setPopupOpen(true);
      };
    
      const closePopup = () => {
        setPopupOpen(false);
      };
    
      const handleSubmit = (inputValue) => {
        // Handle the submitted value (e.g., show an alert)
        alert(`Submitted: ${inputValue}`);
      };
    
  return (
    <div>
       
        <div className='product-container'> 

        <div className='container'> 
        <Link to={`/product/${prod.userId}/${prod.id}`}className='container-link' style={{ textDecoration: 'none', color: 'black' }}>
        <img src={prod.photo} alt="" style={{ width: '280px', height: '200px' }} />
        </Link>
        <div className="plant-details">
            <p className='plant-name'>{prod.name}</p>
            <div className="product-description">
                <p>{prod.description}</p>
            </div>
            <p className='product-price'><b>Current Bid: ${prod.currentBid}</b></p>
            <p className='product-price'><b>Highest Bidder: {prod.highestBidder}</b></p>
            <div className="product-footer">
            <button className="buy-btn" onClick={openPopup}>Bid</button>
                {isPopupOpen && (
               <div className="popupu-overlay">
               <div className="addu-product-popup">
                 
                 <BidPopup auctionId={prod.auctionId} productId={prod.id} currentBid={prod.currentBid} onClose={closePopup} onSubmit={handleSubmit}/>
     
            
                </div>
              </div>
            ) }  
            </div>
            </div>
        </div>
        </div>
      
    </div>
  )
}

export default AuctionProduct
