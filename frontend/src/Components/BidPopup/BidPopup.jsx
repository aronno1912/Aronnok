
import React, { useState } from 'react';
import './BidPopup.css';
import axios from 'axios';

const BidPopup = ({ auctionId, productId, userId, currentBid, onClose, }) => {
  const [inputValue, setInputValue] = useState('');
  const [state,setState] = useState(1);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const placeBid = async () => {
    if(Number(inputValue)>currentBid){
      console.log(Number(inputValue));
      try {
        console.log(userId);
        console.log(auctionId);
        console.log(productId);
        await axios.post(`http://localhost:8000/api/auction/${auctionId}/products/${productId}/bid`, {"bidAmount":Number(inputValue) , "bidder": userId});
        setState(2);
      } catch (error) {
        console.error('Error bidding', error);
      }
    }
    else
      setState(3);
  };


  return (
    <div className="popupu-container">
      <div className="popupu-content">
        <span className="popupu-close-btn" onClick={onClose}>&times;</span>
        {state===1 && (<label htmlFor="inputField">Enter amount:</label>)}
        {state===2 && (<p>Your bid is placed successfully</p>)}
        {state===3 && (<label htmlFor="inputField" style={{color:'red'}}>Enter amout greater than current bid:</label>)}
        {(state===1||state===3)&&(
          <div>
        <input
          type="text"
          id="inputField"
          placeholder="Type here"
          value={inputValue}
          onChange={handleInputChange}
          style={{width:"200px"}}
        />
        <button onClick={placeBid} style={{marginTop:'10px'}}>Submit</button>
        </div>
        )}
        
      </div>
    </div>
  );
};

export default BidPopup;
