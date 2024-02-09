// import React from 'react'
// import AdminNavbar from '../Components/AdminNavbar/AdminNavbar'
// import Sidebar from '../Components/Sidebar/Sidebar'

// const ViewAucReqPage = () => {
//   return (
//     <div>
//         <AdminNavbar/>
//         <Sidebar    />
//         <div className="auction-product-list">
//         {auctionProducts.map((product) => (
//           <PastSmallAuctionProduct
//             key={product._id}
//             productName={product.name}
//             highestBid={product.currentBid}
//             userWhoBid={product.highestBidder}
//             productPhoto={product.photo}
//             catagory={catagory}
//           />
//         ))}
//       </div>
      
//     </div>
//   )
// }

// export default ViewAucReqPage

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from '../Components/AdminNavbar/AdminNavbar';
import Sidebar from '../Components/Sidebar/Sidebar';
import PastSmallAuctionProduct from '../Components/PastSmallAuctionProduct/PastSmallAuctionProduct';
import { useParams } from 'react-router-dom';
import FutureReqProduct from '../Components/PastSmallAuctionProduct/FutureReqProduct';

// const ViewAucReqPage = () => {
//     const {auctionId}=useParams();
//   const [auctionProducts, setAuctionProducts] = useState([]);
 

//   useEffect(() => {
//     const fetchAuctionProducts = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/api/auction/all/${auctionId}/auction-request`);
//         console.log(auctionId);
//         setAuctionProducts(response.data.products); // Update 'products' based on the actual response structure
//       } catch (error) {
//         console.error('Error fetching auction products:', error);
//       }
//     };

//     fetchAuctionProducts();
//   }, []);

//   return (
//     <div>
//       <AdminNavbar />
//       <Sidebar />
//       <div className="auction-product-list">
//         {auctionProducts.map((product) => (
//           <PastSmallAuctionProduct
//             key={product._id}
//             productName={product.name}
//             highestBid={product.initialBid}
//             // userWhoBid={product.highestBidder}
//             productPhoto={product.photo}
           
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ViewAucReqPage;

const ViewAucReqPage = () => {
    const { auctionId } = useParams();
    const [auctionProducts, setAuctionProducts] = useState([]);

    useEffect(() => {
        const fetchAuctionProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/auction/all/${auctionId}/auction-request`);
                console.log(auctionId);
                setAuctionProducts(response.data.products); // Update 'products' based on the actual response structure
            } catch (error) {
                console.error('Error fetching auction products:', error);
            }
        };

        fetchAuctionProducts();
    }, [auctionProducts]);

    return (
        <div>
            <AdminNavbar />
            <Sidebar />
            <div className="auction-product-list">
                {auctionProducts.map((product) => (
                    <FutureReqProduct
                        key={product._id}
                        productName={product.name}
                        highestBid={product.initialBid}
                         userWhoBid="user"
                        productPhoto={product.photo}
                    />
                ))}
            </div>
        </div>
    );
};

export default ViewAucReqPage;

