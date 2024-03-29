// import React from "react";
// import { useParams } from 'react-router-dom';
// import OneProduct from "../Components/OneProduct/OneProduct";

// const ViewProduct = (props) => {
//     // Get the product ID from the URL parameters
//     // const { productId } = useParams();
//     const { productId } = props.params;

//     return (
//         <div>
//            {/* Pass the product ID to the OneProduct component */}
//            <OneProduct productId={productId} />
//         </div>
//     );
// };

// export default ViewProduct;

import React from 'react';
import OneProduct from '../Components/OneProduct/OneProduct';
import Footer from '../Components/Footer/Footer';
import { useParams } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';




const ViewProduct = () => {
    // Get the product ID from the URL parameters
    const { category,userId,productId} = useParams();
    console.log(productId);
    console.log("helloooooooooooooooooooooooooooo we got the product id", {productId});
  
    return (
      <div>
        <Navbar userId={userId}/>
        {/* Pass the product ID to the OneProduct component */}
        <OneProduct productId={productId} userId={userId} mypath={category === 'comingsoon' ? 'product' : 'comingsoon'}/>
        <Footer />
      </div>
    );
  };
  
  export default ViewProduct;