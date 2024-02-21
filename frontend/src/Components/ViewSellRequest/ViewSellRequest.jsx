import React from 'react';
import PropTypes from 'prop-types';
import './ViewSellRequest.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewSellRequest = ({ productName, askingPrice, userWhoBid, productPhoto ,description,reqId}) => {

    


    const handleaccept = async () => {
        console.log(reqId);
        await axios.post(`http://localhost:8000/api/requestApproval/${reqId}`);
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
   
        <p> <strong>Asking Price:</strong> ${askingPrice}</p>
      
       
        <p><strong> User : </strong>{userWhoBid}</p>

      </div>
      <button className="fadd-to-auction-button" onClick={handleaccept}>Accept</button>
    </div>
  );
};

ViewSellRequest.propTypes = {
  productName: PropTypes.string.isRequired,
  askingPrice: PropTypes.number.isRequired,
  userWhoBid: PropTypes.string.isRequired,
  productPhoto: PropTypes.string.isRequired,
 description: PropTypes.string.isRequired,
    reqId: PropTypes.string.isRequired,
  
};

export default ViewSellRequest;
