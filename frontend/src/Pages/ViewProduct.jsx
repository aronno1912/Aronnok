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

// const ViewProduct = () => {
  
//     return (
//         <div>
          
//            <OneProduct />
//               <Footer />

//         </div>
//     )
// }

// export default ViewProduct;


const ViewProduct = () => {
    // Get the product ID from the URL parameters
    const { productId } = useParams();
    console.log(productId);
    console.log("helloooooooooooooooooooooooooooo we got the product id", {productId});
  
    return (
      <div>
        {/* Pass the product ID to the OneProduct component */}
        <OneProduct productId={productId} />
        <Footer />
      </div>
    );
  };
  
  export default ViewProduct;