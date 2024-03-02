import React, { useState, useEffect } from 'react';
import './WinnedProductList.css'; // Import your CSS file for styling
import axios from 'axios';

const WinnedProductsList = ({userId}) => {
  const [winnedProducts, setWinnedProducts] = useState([]);

  useEffect(() => {
    const fetchWinnedProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/userauctioninfoforadmin/${userId}`);
        setWinnedProducts(response.data);
      } catch (error) {
        console.error('Error fetching won auction products:', error);
      }
    };

    fetchWinnedProducts();
  }, []);

  return (
    <div className="winned-products-list">
      {winnedProducts.map((product) => (
        <div key={product.productId} className="winned-product-item">
          <div className="winproduct-photo">
            <img src={product.photo} alt={product.name} />
          </div>
          <div className="winproduct-details">
            <p className="winproduct-name">{product.name}</p>
            <p className="winauction-name">{product.auctionName}</p>
            <p className="winbid-amount">Bid Amount: ${product.currentBid}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WinnedProductsList;
