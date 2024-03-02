
import React, { useContext } from 'react';
import './OneProduct.css';
import star_icon from '../Assets/star_icon.png';
import dull_star_icon from '../Assets/star_dull_icon.png';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from "../../backend";
import { useParams } from 'react-router-dom';
import { ProjectContext } from '../../Context/ProjectContext';

import star_dull from '../Assets/star_dull_icon.png'

import star from '../Assets/star_icon.png'


// const OneProduct = () => {
// //   const { id } = useParams();

//   // Find the product with the matching id
//   const product = all_plants[0]

//   if (!product) {
//     return <p>Product not found</p>;
//   }


const OneProduct = ({ mypath, productId, userId, whattype }) => {
  //const { productId,userId,mypath} = useParams();
  let flag = false;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [totalQuantity, setQuantity] = useState(0);
  const { totalQuantity, updateTotalQuantity } = useContext(ProjectContext);
  console.log("mypathvin one product")
  console.log(mypath)
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        let response = await axios.get(mypath);
        // console.log("in one product: "+response.data)
        // if(response.data.length===0)
        // response = await axios.get(`http://localhost:8000/api/comingsoon/product/${userId}/${productId}`);
        setProduct(response.data);


      } catch (error) {
        console.error('Error fetching product data:', error);
      } finally {
        setLoading(false);
      }
    };


    fetchProduct();
    //fetchTotalQuantity();
  }, [mypath, productId, userId, whattype]);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (whattype == "comingsoon") {
    flag = true;
  } else {
    flag = false;
  }

  if (!product) {
    return <p>Product not found</p>;
  }


  const addToCart = async () => {
    try {
      await axios.post(`http://localhost:8000/api/cart/add/${userId}/${productId}`, {});
    } catch (error) {
      console.error('Error adding', error);
    }
    updateTotalQuantity();
  };
  const addToFavourites = async () => {
    try {
      await axios.post(`http://localhost:8000/api/favourites/create/${userId}`, { "plantId": productId });
    } catch (error) {
      console.error('Error adding', error);
    }
    updateTotalQuantity();
  };
  const addToWishlist = async () => {
    try {
      await axios.post(`http://localhost:8000/api/wishlist/create/${userId}`, { "plantId": productId });
    } catch (error) {
      console.error('Error adding', error);
    }
    updateTotalQuantity();
  };
  const ratingStars = () => {
    const result = [];
    for (let i = 0; i < product.rating; i++) {
      result.push(<img src={star} alt="" />);
    }
    for (let i = product.rating; i < 5; i++) {
      result.push(<img src={star_dull} alt="" />);
    }
    return result;
  };
  const isInStock = product.stock > 0;

  const imageUrl = product.photo || ''; // Default to an empty string if product.photo is undefined


  return (
    <div className='oneproduct'>
      <div className="oneproduct__left">
        <div className="oneproduct__left__img">
          {/* <img className='main-img' src={product.photo} alt="Bansaiitis" /> */}
          {imageUrl && (
            <img className='main-img' src={product.photo} alt={product.name} />
          )}
        </div>
        <div className="oneproduct-careinfo" style={{ padding: '50px' }}>
          <div className="oneproduct-hardcode">
            <p><i class="bi bi-calendar-fill" style={{ color: 'rgb(236, 166, 82)', fontSize: '25px', paddingRight: '25px' }}></i>9 years</p>
            <p><i class="bi bi-thermometer" style={{ color: 'rgb(236, 166, 82)', fontSize: '25px', paddingRight: '25px' }}></i>80% humidity</p>
            <p><i class="bi bi-rulers" style={{ color: 'rgb(236, 166, 82)', fontSize: '25px', paddingRight: '25px' }}></i>5.2 inch</p>
          </div>
        </div>
      </div>
      <div className="oneproduct__right">
        <h1>{product.name}</h1>
        
        <p ><i >({product.sciname})</i></p> 
        <div className="oneproduct__right__rating">
          {ratingStars()}
          {flag?(<p></p>):(<p>(122)</p>)}
          {/* <p>(122)</p> */}
        </div>

        <div className="prouctdisplay-right-prices" >
          <div className="prouctdisplay-right-prices-new">
            ${product.price}
          </div>
          <div className="productdisplay-right-description">
            {product.description}
          </div>


        </div>
        {flag ? (
          <>
          <p className="in-stock">Coming Soon</p>
          <button className="productdisplay-right-button2" onClick={addToWishlist}>Add to Wishlist</button>
          </>
        ) : (
          isInStock ? (
            <>
              <p className="in-stock">In Stock</p>
              <button className="productdisplay-right-button" onClick={addToCart}>Add to Cart</button>
            </>
          ) : (
            <>
              <p className="out-of-stock">Out of Stock</p>
              <button className="productdisplay-right-button2" onClick={addToWishlist}>Add to Wishlist</button>
            </>
          )
        )}






        <button className="productdisplay-right-button3" onClick={addToFavourites}>Add to Favourites</button>
        {/* <p>Description: {product.description}</p>
        {/* Add other details as needed */}

      </div>
    </div>
  )
}

export default OneProduct;
