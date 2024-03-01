

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from '../Components/AdminNavbar/AdminNavbar';
import Sidebar from '../Components/Sidebar/Sidebar';
import PastSmallAuctionProduct from '../Components/PastSmallAuctionProduct/PastSmallAuctionProduct';
import { useParams } from 'react-router-dom';
import FutureReqProduct from '../Components/PastSmallAuctionProduct/FutureReqProduct';
import ViewSellRequest from '../Components/ViewSellRequest/ViewSellRequest';
const ViewSellRequestPage = () => {
   
    const [auctionProducts, setAuctionProducts] = useState([]);

    useEffect(() => {
        const fetchAuctionProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/sellRequest/getAll`);
              

                // Ensure response.data.products is an array before setting the state
                if (Array.isArray(response.data)) {
                    setAuctionProducts(response.data);
                } else {
                    console.error('Invalid response format - products is not an array:', response.data);
                }
            } catch (error) {
                console.error('Error fetching auction products:', error);
            }
        };

        fetchAuctionProducts();
    }, []);

    return (
        <div>
            <AdminNavbar />
            <Sidebar />
            <div className="auction-product-list">
                {auctionProducts.map((product) => (
                    <ViewSellRequest
                        key={product._id}
                        productName={product.name}
                        askingPrice={product.askingPrice}
                        userWhoBid={product.username}
                        productPhoto={product.photo}
                        description={product.description}
                        reqId={product._id}
                        userId={product.user}
                    />
                ))}
            </div>
        </div>
    );
};

export default ViewSellRequestPage;