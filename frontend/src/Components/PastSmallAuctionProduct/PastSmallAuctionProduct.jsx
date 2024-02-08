// import React from 'react';
// import './PastSmallAuctionProduct.css';

// const PastSmallAuctionProduct = ({ productName, highestBid, userWhoBid, productPhoto }) => {
//   return (
//     <div className="pastauction-product-details">
//       <div className="pastproduct-photo">
//         <img src={productPhoto} alt={productName} />
//       </div>
//       <div className="pastproduct-info">
//         <h2>{productName}</h2>
//         <p>Highest Bid: ${highestBid}</p>
//         <p>User: {userWhoBid}</p>
//       </div>
//     </div>
//   );
// };

// export default PastSmallAuctionProduct;

// import React from 'react';
// import './PastSmallAuctionProduct.css';

// const PastSmallAuctionProduct = () => {
//   // Hardcoded data for demonstration
//   const productName = "Sample Product";
//   const highestBid = 100;
//   const userWhoBid = "John Doe";
//   const productPhoto = "/auction_photo.jpg";

//   return (
//     <div className="pastauction-product-details">
//       <div className="pastproduct-photo">
//         <img src={productPhoto} alt={productName} />
//       </div>
//       <div className="pastproduct-info">
//         <h2>{productName}</h2>
//         <p>Highest Bid: ${highestBid}</p>
//         <p>User: {userWhoBid}</p>
//       </div>
//     </div>
//   );
// };

// export default PastSmallAuctionProduct;


// import React from 'react';
// import './PastSmallAuctionProduct.css';

// const PastSmallAuctionProduct = () => {
//   // Hardcoded data for demonstration
//   const productName = "Sample Product";
//   const highestBid = 100;
//   const userWhoBid = "John Doe";
//   const productPhoto = "/auction_photo.jpg";

//   return (
//     <div className="past-auction-product-card">
//       <div className="product-image">
//         <img src={productPhoto} alt={productName} />
//       </div>
//       <div className="product-details">
//         <h3>{productName}</h3>
//         <p>Highest Bid: ${highestBid}</p>
//         <p>User: {userWhoBid}</p>
//       </div>
//     </div>
//   );
// };

// export default PastSmallAuctionProduct;




import React from 'react';
import PropTypes from 'prop-types';
import './PastSmallAuctionProduct.css';

const PastSmallAuctionProduct = ({ productName, highestBid, userWhoBid, productPhoto }) => {
  return (
    <div className="past-auction-product-card">
      <div className="product-image">
        <img src={productPhoto} alt={productName} />
      </div>
      <div className="product-details">
        <h3>{productName}</h3>
        <p>Highest Bid: ${highestBid}</p>
        <p>User: {userWhoBid}</p>
      </div>
    </div>
  );
};

PastSmallAuctionProduct.propTypes = {
  productName: PropTypes.string.isRequired,
  highestBid: PropTypes.number.isRequired,
  userWhoBid: PropTypes.string.isRequired,
  productPhoto: PropTypes.string.isRequired,
};

export default PastSmallAuctionProduct;



