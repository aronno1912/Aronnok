import React from 'react';
import PropTypes from 'prop-types';
import './PastSmallAuctionProduct.css';

const FutureReqProduct = ({ productName, highestBid, userWhoBid, productPhoto }) => {
  
  return (
    <div className="past-auction-product-card">
      <div className="product-image">
        <img src={productPhoto} alt={productName} />
      </div>
      <div className="product-details">
        <h3>{productName}</h3>
   
        <p>Starting Bid: ${highestBid}</p>
      
       
        <p>{ `User: ${userWhoBid}`}</p>
      </div>
    </div>
  );
};

FutureReqProduct.propTypes = {
  productName: PropTypes.string.isRequired,
  highestBid: PropTypes.number.isRequired,
  userWhoBid: PropTypes.string.isRequired,
  productPhoto: PropTypes.string.isRequired,
  
};

export default FutureReqProduct;



