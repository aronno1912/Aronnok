import React from 'react';
import '../Context/AdAuctionProductBids.css';
import { useState, useEffect } from 'react';

const AdAuctionProductBids = () => {
    const bids = [
        { user: 'User1', amount: 150, timestamp: '2024-03-15 14:30:00' },
        { user: 'User2', amount: 200, timestamp: '2024-03-15 14:35:00' },
        { user: 'User3', amount: 180, timestamp: '2024-03-15 14:40:00' },
      ];
    const [refreshCount, setRefreshCount] = useState(0);
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        // Fetch updated data here
        // Example: call an API to get the latest bids
        console.log('Fetching updated data...');
        setRefreshCount((prevCount) => prevCount + 1);
      }, 5000);
  
      // Clear the interval when the component unmounts
      return () => clearInterval(intervalId);
    }, []);

  return (
    <div className="auction-product-bids">
      <h2 className='bidh2'>Bids by Users</h2>
      <ul className='bidul'>
        {bids.map((bid, index) => (
          <li key={index} className="bid-item">
            <div>
              <strong>User:</strong> {bid.user}
            </div>
            <div>
              <strong>Bid Amount:</strong> ${bid.amount}
            </div>
            <div>
              <strong>Time:</strong> {bid.timestamp}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdAuctionProductBids;
