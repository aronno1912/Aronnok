import React from 'react';
import OneProduct from '../Components/OneProduct/OneProduct';
import Footer from '../Components/Footer/Footer';
import { useParams } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';
import AdminNavbar from '../Components/AdminNavbar/AdminNavbar';
import EditProduct from '../Components/EditProduct/EditProduct';




const EditProductPageAd = () => {
    // Get the product ID from the URL parameters
    const { productId } = useParams();
    console.log(productId);
    console.log("helloooooooooooooooooooooooooooo we got the product id", {productId});
  
    return (
      <div>
        <AdminNavbar />
        {/* Pass the product ID to the OneProduct component */}
        <EditProduct productId={productId} userId="65a294c44865e9f4138c7281"/>
        <Footer />
      </div>
    );
  };
  
  export default EditProductPageAd;