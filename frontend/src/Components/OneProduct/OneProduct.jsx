// import React, { useState, useEffect } from 'react'
// import './OneProduct.css'
// import all_plants from '../Assets/all_products'
// import { useParams } from 'react-router-dom';

// const OneProduct = () => {
//     const { id } = useParams();

//   return (
//     <div classname='oneproduct'>
//         <div className="oneproduct__left">
//             <div className="oneproduct__left__img">
//                 <img className='main-img' src={product.photo} alt="" />
//             </div>
//         </div>

//     </div>
//   )
// }
// export default OneProduct
import React from 'react';
import './OneProduct.css';
import all_plants from '../Assets/all_products';
import coverImage from '../Assets/bansai.jpg'; 


const OneProduct = () => {
//   const { id } = useParams();

  // Find the product with the matching id
  const product = all_plants[0]

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className='oneproduct'>
      <div className="oneproduct__left">
        <div className="oneproduct__left__img">
          <img className='main-img' src={product.photo} alt="Bansaiitis" />
        </div>
      </div>
      <div className="oneproduct__right">
        {/* <h1>{product.name}</h1>
        <p>ID: {product._id}</p>
        <p>Price: {product.price}</p>  */}
        {/* <p>Description: {product.description}</p>
        {/* Add other details as needed */}
        <p>hello world</p>
        <p>hello world</p>
        <p>hello world</p>
        <p>hello world</p>
      </div>
    </div>
  )
}

export default OneProduct;
