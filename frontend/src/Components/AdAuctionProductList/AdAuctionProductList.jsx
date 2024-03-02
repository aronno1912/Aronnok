// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import PastSmallAuctionProduct from '../PastSmallAuctionProduct/PastSmallAuctionProduct';
// import { useParams } from 'react-router-dom';
// import AdminNavbar from '../AdminNavbar/AdminNavbar';
// import Sidebar from '../Sidebar/Sidebar';
// import { Link } from 'react-router-dom';
// import AuctionAddPlant from '../AuctionAddPlant/AuctionAddPlant';
// import './AdAuctionProductList.css';

// const AdAuctionProductList = ({auctionId,catagory}) => {
//   const [showAddProductPopup, setShowAddProductPopup] = useState(false);
//     // const { auctionId} = useParams();
//     console.log(auctionId);
//     console.log(catagory);
//     console.log("hello");
//   const [auctionProducts, setAuctionProducts] = useState([]);

//   useEffect(() => {
//     const fetchAuctionProducts = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/api/auction/${auctionId}/products`);
//         setAuctionProducts(response.data);
//         console.log(response.data);
//       } catch (error) {
//         console.error('Error fetching auction products:', error);
//       }
//     };

//     fetchAuctionProducts();
//   }, [auctionId,catagory]);

//   const handleAddProductClick = () => {
//     setShowAddProductPopup(true);
    
//   };
//   const handleClosePopup = () => {
//     // Close the Add Product popup
//     setShowAddProductPopup(false);
//   };

//   const buttonStyle = {
//     position: 'fixed',
//     top: '100px',
//     right: '80px',
//     fontSize: '18px', // Adjust the font size
//     padding: '10px 20px', // Adjust the padding
//   };

//   return (
//     <div>
//     <AdminNavbar/>
//     <Sidebar/>
//     <div className="auction-product-list">
 
        
//       {auctionProducts.map((product) => (
//         <PastSmallAuctionProduct
//           key={product._id}
//           productName={product.name}
//           highestBid={product.currentBid}
//           userWhoBid={product.highestBidder}
//           productPhoto={product.photo}
//           catagory={catagory}
//         />
//       ))}
     
//     </div>
//     {catagory === 'upcoming' && (
//         <button className="add-product-buttoninauction" onClick={handleAddProductClick} style={buttonStyle}>
//           Add Product
//         </button>
       
//       )}

// {showAddProductPopup && (
//         <div className="popup-overlay">
//           <div className="add-product-popup">
//             {/* Include the AuctionAddPlant component */}
//             <AuctionAddPlant auctionId={auctionId}/>

//             {/* Include a close button to close the popup */}
//             <button onClick={handleClosePopup} className="close-popup-button">
//               Close
//             </button>
//           </div>
//         </div>
//       )}


//     </div>
//   );
// };

// export default AdAuctionProductList;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PastSmallAuctionProduct from '../PastSmallAuctionProduct/PastSmallAuctionProduct';
import { useParams, Link } from 'react-router-dom';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import Sidebar from '../Sidebar/Sidebar';
import AuctionAddPlant from '../AuctionAddPlant/AuctionAddPlant';
import './AdAuctionProductList.css';

const AdAuctionProductList = ({ auctionId, catagory }) => {
  const [showAddProductPopup, setShowAddProductPopup] = useState(false);

  const [auctionProducts, setAuctionProducts] = useState([]);

  useEffect(() => {
    const fetchAuctionProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/auction/${auctionId}/products`);
        setAuctionProducts(response.data);
      } catch (error) {
        console.error('Error fetching auction products:', error);
      }
    };

    fetchAuctionProducts();
  }, [auctionId, catagory]);

  const handleAddProductClick = () => {
    setShowAddProductPopup(true);
  };

  const handleClosePopup = () => {
    setShowAddProductPopup(false);
  };

  const buttonStyle = {
    position: 'fixed',
    top: '100px',
    fontSize: '18px',
    padding: '10px 20px',
  };

  return (
    <div>
      <AdminNavbar />
      <Sidebar />
      <div className="auction-product-list">
        {auctionProducts.map((product) => (
          <PastSmallAuctionProduct
            key={product._id}
            productName={product.name}
            highestBid={product.currentBid}
            userWhoBid={product.highestBidder}
            productPhoto={product.photo}
            catagory={catagory}
          />
        ))}
      </div>

      {catagory === 'upcoming' && (
        <>
          <button className="add-product-buttoninauction-right" onClick={handleAddProductClick} style={buttonStyle}>
            Add Product
          </button>

          {/* Add the "View Requests" button */}
          <Link to={`/admin/viewauctions/upcoming/${auctionId}/viewrequests`} className="view-requests-buttoninauction" style={buttonStyle}>
            View Requests
          </Link>
        </>
      )}

      {showAddProductPopup && (
        <div className="popup-overlay">
          <div className="add-product-popup">
            <AuctionAddPlant auctionId={auctionId} />
            <button onClick={handleClosePopup} className="close-popup-button">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdAuctionProductList;
