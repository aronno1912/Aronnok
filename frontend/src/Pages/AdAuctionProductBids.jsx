

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Context/AdAuctionProductBids.css';
import { useParams } from 'react-router-dom';
import Sidebar from '../Components/Sidebar/Sidebar';
import AdminNavbar from '../Components/AdminNavbar/AdminNavbar';

const AdAuctionProductBids = () => {
  const [bids, setBids] = useState([]);
  const [refreshCount, setRefreshCount] = useState(0);
  const {auctionId}=useParams ();
    const {productId}=useParams ();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/auction/${auctionId}/${productId}`);
        // const response = await axios.get('http://localhost:8000/api/auction/65bd415809608a5f34558cc7/65bd416e09608a5f34558ccb');
        setBids(response.data);
        console.log('Fetching updated data...');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Fetch initial data
    fetchData();

    // Set up interval for automatic refresh
    const intervalId = setInterval(() => {
      fetchData();
      setRefreshCount((prevCount) => prevCount + 1);
    }, 5000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="ad-auction-product-bids">
        <AdminNavbar/>
        <Sidebar/>
    <div className="auction-product-bids" >
        
      <h2 className='bidh2'>Bids by Users</h2>
      <ul className='bidul'>
        {bids.map((bid, index) => (
          <li key={index} className="bid-item">
            <div>
              <strong>User:</strong> {bid.bidderName}
            </div>
            <div>
              <strong>Bid Amount:</strong> ${bid.bidAmount}
            </div>
            <div>
              <strong>Time:</strong> {bid.timestamp}
            </div>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default AdAuctionProductBids;
