import React, { useContext, useEffect, useState } from 'react'
import './CartItem.css'
import cross_btn from '../Assets/cross-btn.jpg';
import { CartContext } from '../../Context/CartContext';
import axios from 'axios';
import { ProjectContext } from '../../Context/ProjectContext';

// const fetchAllItems = async ()=>{
//     try {
//         const response = await fetch('http://localhost:8000/api/cart/viewCart/659c027001b07da1b7fef185');
//         const data = await response.json();
//         return data.items;
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
      
// }

const CartItem = (prod) => {
    const [product, setProduct] = useState([]);
    const [quantity, setQuantity] = useState(prod.quantity);
    const [totalPrice, setPrice] = useState(0);
    const [cart, setCart] = useState({});
    const [cartItems, setCartItems] = useState([]);

    const {totalQuantity,updateTotalQuantity,fetchAllItems}=useContext(ProjectContext);
   
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


    const fetchTotalQuantity = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/cart/getQuantity/659c027001b07da1b7fef185/${prod.id}`);
        const data = await response.json();
        setQuantity(data.quantity);
        setPrice(Math.round(data.quantity*data.price));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

     fetchProduct();
     fetchTotalQuantity();
  }, []);

  

    const increment = async () => {
        setQuantity(quantity+1);
        setPrice(Math.round(totalPrice+product.price));
        try {
            
            await axios.put(`http://localhost:8000/api/cart/update/659c027001b07da1b7fef185/${prod.id}`, {"quantity": quantity, "selected":true});
            console.log('product added to cart');
          } catch (error) {
            console.error('Error adding', error);
          }
          console.log(fetchAllItems());
        //   updateTotalQuantity(fetchAllItems());
      };

      const decrement = async () =>{
        setQuantity(quantity-1);
        setPrice(Math.round(totalPrice-product.price));
        try {
            await axios.put(`http://localhost:8000/api/cart/update/659c027001b07da1b7fef185/${prod.id}`, {"quantity": quantity, "selected":true});
            console.log('product deleted from cart');
          } catch (error) {
            console.error('Error deleteing ', error);
          }
          //   updateTotalQuantity(fetchAllItems());
      };

      const getTotalPrice = () => {
       
      };

  return (
   <div className="cart-item-container">
    <div className="cart-item-left">
        <img src={prod.photo} alt="" />
        <div className="name-quantity">
            <p style={{fontSize:'17px', color:'rgb(2, 75, 33)'}}>{product.name}</p>
            <div className="item-quantity">
                <button onClick={decrement}>-</button>
                <p style={{marginTop:"1px"}}>{quantity}</p>
                <button onClick={increment}>+</button>
            </div>
        </div>
    </div>
    <div className="cart-item-middle">
        <p>${product.price}</p>
    </div>
    <div className="cart-item-right">
        <button className='remove-btn'><i class="bi bi-x"  style={{ fontSize: '20px' }}></i></button>
        <p><b>${totalPrice}</b></p>
    </div>
    
   </div>
  )
}


export default CartItem
