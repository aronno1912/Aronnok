import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PastSmallAuctionProduct from '../Components/PastSmallAuctionProduct/PastSmallAuctionProduct';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AuctionAddPlantClient from '../Components/AuctionAddPlant/AuctionAddPlantClient';
import '../Components/AdAuctionProductList/AdAuctionProductList.css';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';

const AuctionPast = () => {
    const {userId,auctionId}=useParams();
    const [showAddProductPopup, setShowAddProductPopup] = useState(false);
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

    const handleAddProductClick2 = () => {
        setShowAddProductPopup(true);
    };
    const handleClosePopup = () => {
        // Close the Add Product popup
        setShowAddProductPopup(false);
    };

    const buttonStyle = {
        position: 'fixed',
        top: '100px',
        right: '80px',
        fontSize: '18px', // Adjust the font size
        padding: '10px 20px', // Adjust the padding
    };
        

        const listAllStyle = {
        //    marginLeft: '250px',
        display: 'flex', // Add other styles as needed
        justifyContent: 'center', // Center the content horizontally
        alignItems: 'center',
            marginTop: '70px',
        };


  return (
    <div>
        <Navbar userId={userId}/>
        <div classname="listall" style={listAllStyle}>
            
        <div className="auction-product-list">
 
        
      {auctionProducts.map((product) => (
        <PastSmallAuctionProduct
          key={product._id}
          productName={product.name}
          highestBid={product.currentBid}
          userWhoBid={product.highestBidder}
          productPhoto={product.photo}
          catagory={"completed"}
        />
      ))}
    </div>


{showAddProductPopup && (
        <div className="popup-overlay">
          <div className="add-product-popup">
            {/* Include the AuctionAddPlant component */}
            <AuctionAddPlantClient auctionId={auctionId}/>

            {/* Include a close button to close the popup */}
            <button onClick={handleClosePopup} className="close-popup-button">
              Close
            </button>
          </div>
        </div>
      )}


        </div>
        <Footer/>
      
    </div>
  )
}

export default AuctionPast