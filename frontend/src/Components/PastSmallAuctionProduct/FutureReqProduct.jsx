import React from 'react';
import PropTypes from 'prop-types';
import './frp.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const FutureReqProduct = ({ productName, highestBid, userWhoBid, productPhoto ,description,reqId}) => {

    const { auctionId } = useParams();


    const handleaccept = async () => {
        await axios.post(`http://localhost:8000/api/auction/auction-request-approval/${auctionId}/${reqId}`);
        console.log("Accepted");
    };
  
  return (
    <div className="fpast-auction-product-card" >
      <div className="fproduct-image">
        <img src={productPhoto} alt={productName} />
      </div>
      <div className="fproduct-details">
        <h3>{productName}</h3>
        <p>{description}</p>
   
        <p> <strong>Starting Bid:</strong> ${highestBid}</p>
      
       
        <p><strong> User : </strong>{userWhoBid}</p>

      </div>
      <button className="fadd-to-auction-button" onClick={handleaccept}>Accept</button>
    </div>
  );
};

FutureReqProduct.propTypes = {
  productName: PropTypes.string.isRequired,
  highestBid: PropTypes.number.isRequired,
  userWhoBid: PropTypes.string.isRequired,
  productPhoto: PropTypes.string.isRequired,
 description: PropTypes.string.isRequired,
    reqId: PropTypes.string.isRequired,
  
};

export default FutureReqProduct;



