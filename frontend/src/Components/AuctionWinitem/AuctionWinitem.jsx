import axios from 'axios';
import React, { useState } from 'react'
import './AuctionWinitem.css'

const AuctionWinitem = (prod) => {
    const [product, setProduct] = useState([]);

      const pay = async () => {
          try {
            const response=await axios.post(`http://localhost:8000/api/auction/${prod.auctionId}/${prod.id}/payment`, {});
            const textUrl=response.data.url;
            
            window.location.href = textUrl;
          } catch (error) {
            console.error('Error bidding', error);
          }
      };

  return (
    <div>
    <div className="winitem-container">
        <div className="winitem-left">
            <img src={prod.photo} alt="" />
            <div className="winitem-name-quantity">
                <p style={{fontSize:'17px', color:'rgb(2, 75, 33)'}}>{prod.name}</p>
            </div>
        </div>
        <div className="winitem-middle">
            <p><b>${prod.price}</b></p>
        </div>
        <div className="winitem-right">
            <button onClick={pay}>pay for item</button>
        </div>
    
   </div>
    </div>
  )
}

export default AuctionWinitem
