import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PastSmallAuctionProduct from '../PastSmallAuctionProduct/PastSmallAuctionProduct';
import { useParams } from 'react-router-dom';

const AdAuctionProductList = () => {
    const { auctionId} = useParams();
  const [auctionProducts, setAuctionProducts] = useState([]);

  useEffect(() => {
    const fetchAuctionProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/auction/${auctionId}/products`);
        setAuctionProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching auction products:', error);
      }
    };

    fetchAuctionProducts();
  }, [auctionId]);

  return (
    <div className="auction-product-list">
      {auctionProducts.map((product) => (
        <PastSmallAuctionProduct
          key={product._id}
          productName={product.name}
          highestBid={product.currentBid}
          userWhoBid={product.highestBidder}
          productPhoto={product.photo}
        />
      ))}
    </div>
  );
};

export default AdAuctionProductList;
