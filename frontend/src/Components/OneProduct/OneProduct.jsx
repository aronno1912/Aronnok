
import React, { useContext } from 'react';
import './OneProduct.css';
import star_icon from '../Assets/star_icon.png';
import dull_star_icon from '../Assets/star_dull_icon.png';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from "../../backend";
import { useParams } from 'react-router-dom';
import { ProjectContext } from '../../Context/ProjectContext';




// const OneProduct = () => {
// //   const { id } = useParams();

//   // Find the product with the matching id
//   const product = all_plants[0]

//   if (!product) {
//     return <p>Product not found</p>;
//   }


const OneProduct = () => {
  const { productId,userId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [totalQuantity, setQuantity] = useState(0);
  const {totalQuantity,updateTotalQuantity}=useContext(ProjectContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/product/${userId}/${productId}`);
        console.log("id is ",productId);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      } finally {
        setLoading(false);
      }
    };

    // const fetchTotalQuantity = async () => {
    //   try {
    //     const response = await fetch(`http://localhost:8000/api/cart/getQuantity/659c027001b07da1b7fef185/${productId}`);
    //     const data = await response.json();
    //     setQuantity(data.quantity);
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // };
    fetchProduct();
    //fetchTotalQuantity();
  }, [productId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  
  const addToCart = async () => {
    try {
      await axios.post(`http://localhost:8000/api/cart/add/${userId}/${productId}`, {});
      console.log('product added to cart');
      // alert("Product is added to cart successfully!!! Find them in your cart now!!!");
    } catch (error) {
      console.error('Error adding', error);
    }
    updateTotalQuantity();
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
      </div>
      <div className="oneproduct__right">
        <h1>{product.name}</h1>
        <div className="oneproduct__right__rating">
          <img src={star_icon}alt="" />
          <img src={star_icon}alt="" />
          <img src={star_icon}alt="" />
          <img src={star_icon}alt="" />
          <img src="/star_dull_icon.png" alt="" />
          <p>(122)</p>
          </div>

        <div className="prouctdisplay-right-prices" >
          <div className="prouctdisplay-right-prices-new">
            ${product.price}
          </div>
          <div className="productdisplay-right-description">
            {product.description}
          </div>


        </div>
        {isInStock ? (
          <p className="in-stock">In Stock</p>
        ) : (
          <p className="out-of-stock">Out of Stock</p>
        )}
        {isInStock?
        (<button className="productdisplay-right-button" onClick={addToCart}>Add to Cart</button>):(<button className="productdisplay-right-button2">Add to Wishlist</button>)}
        
        <button className="productdisplay-right-button3">Add to Favourites</button>
        {/* <p>Description: {product.description}</p>
        {/* Add other details as needed */}
    
      </div>
    </div>
  )
}

export default OneProduct;
