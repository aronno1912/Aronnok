import React, { useContext, useEffect, useState } from 'react'
import './CartItem.css'
import cross_btn from '../Assets/cross-btn.jpg';
import { CartContext } from '../../Context/CartContext';
import axios from 'axios';

const CartItem = (prod) => {
    
    // const [totalQuantity, setQuantity] = useState(0);
    const [totalPrice, setPrice] = useState(0);
    const [product, setProduct] = useState([]);
 
  useEffect(() => {
    const fetchProduct = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/product/659c027001b07da1b7fef185/${prod.id}`);
            const data = await response.json();
            setProduct(data);
        } catch (error) {
          console.error('Error fetching product data:', error);
        }
      };
    // const fetchTotalQuantity = async () => {
    //   try {
    //     const response = await fetch('http://localhost:8000/api/products/659c027001b07da1b7fef185');
    //     const data = await response.json();
    //     setQuantity(data.total);
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // };

    // const fetchTotalPrice = async () => {
    //     try {
    //       const response = await fetch('http://localhost:8000/api/products/659c027001b07da1b7fef185');
    //       const data = await response.json();
    //       setPrice(data.total);
    //     } catch (error) {
    //       console.error('Error fetching data:', error);
    //     }
    //   };
  
    // fetchTotalQuantity();
    // fetchTotalPrice();
  }, []);

    const increment = async () => {
        try {
            await axios.post(`http://localhost:8000/api/cart/add/659c027001b07da1b7fef185/${prod.id}`, { });
            console.log('product added to cart');
          } catch (error) {
            console.error('Error adding', error);
          }
      };

      const decrement = async () =>{
        try {
            await axios.post(`http://localhost:8000/api/cart/deleteItem/659c027001b07da1b7fef185/${prod.id}`, { });
            console.log('product deleted from cart');
          } catch (error) {
            console.error('Error deleteing ', error);
          }
      };

      const getTotalPrice = () => {
       
      };

  return (
   <div className="cart-item-container">
    <div className="cart-item-left">
        <img src={prod.photo} alt="" />
        <div className="name-quantity">
            <p style={{fontSize:'17px', color:'rgb(2, 75, 33)'}}>{prod.name}</p>
            <div className="item-quantity">
                <button onClick={decrement}>-</button>
                <p style={{marginTop:"1px"}}>{prod.total}</p>
                <button onClick={increment}>+</button>
            </div>
        </div>
    </div>
    <div className="cart-item-middle">
        <p>${product.price}</p>
    </div>
    <div className="cart-item-right">
        <button className='remove-btn'><i class="bi bi-x"  style={{ fontSize: '20px' }}></i></button>
        <p><b>${product.price}</b></p>
    </div>
    
   </div>
  )
}


export default CartItem
