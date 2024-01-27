import React, { useContext,useEffect, useState } from 'react'

import CartItem from '../Components/CartItem/CartItem';
import '../Context/ViewCart.css';
import { CartContext } from '../Context/CartContext';
import axios, { all } from 'axios';
import { ProjectContext } from '../Context/ProjectContext';

const ViewCart = (prod) => {
  const disRate= 0.1;
  const {totalQuantity,updateTotalQuantity}=useContext(ProjectContext)
  const [cart, setCart] = useState({});
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/cart/viewCart/659c027001b07da1b7fef185');
        const data = await response.json();
        setCart(data);
        setCartItems(data.items);
        console.log(data.items);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);


  const placeOrder = async () => {
    try {
      // console.log(totalQuantity);
      await axios.post(`http://localhost:8000/api/order/create/659c027001b07da1b7fef185`, {});
      console.log('product added to cart');
    } catch (error) {
      console.error('Error adding', error);
    }
  };


  return (
    <div className="cart-all">
       <div className='cart-items'>
        <div className="cart-items-title">
          <p style={{fontSize:'25px', color:"rgb(17, 77, 44)"}}><b>Cart items</b></p>
          <hr style={{width:"150px", border:"2px solid", borderRadius:"10px"}}/>
        </div>
        <div className="cart-items-header">
          <div className="cart-items-header-p">
            <p><b>Products</b></p>
            <p style={{marginLeft:"140px"}}><b>Price</b></p>
            <p><b>Sub Total</b></p>
          </div>
          <hr style={{position: "absolute", top:"50px", width:"700px"}}/>
        </div>
        {cartItems.map((item,i)=>{
          return <CartItem key={i} id={item.product} quantity={item.quantity}/>
        })}
        {/* {sendToCartItem()} */}
       </div>
       <hr/>
       <div className="cart-hishab">
          <div className="cart-hishab-left">
            <p>Total price</p>
          </div>
          <div className="cart-hishab-right">
            <p>{cart.total}</p>
          </div>
       </div>
       <hr/>
       <div className="cart-place-order">
        <button className="cart-place-order-btn">place order</button>
       </div>
    </div>
    
  )
}


export default ViewCart

// {all_plants.map((item,i)=>{
//   return <CartItem key={i} id={item._id} name={item.name} photo={item.photo} price={item.price}/>
// })}