import React, { useContext,useEffect, useState } from 'react'

import CartItem from '../Components/CartItem/CartItem';
import '../Context/ViewCart.css';
import { CartContext } from '../Context/CartContext';
import { all } from 'axios';

const ViewCart = (prod) => {
  const disRate= 0.1;
    const{all_plants,cartItems,cartTotalPrice,addToCart,removeFromCart,getTotalCartPrice,getTotalCartQuantity}=useContext(CartContext);
  
    const sendToCartItem=()=>{
      let items=[];
      let i=0;
      all_plants.map((plant) => {
        const itemId = plant._id;
        const quantity= cartItems.get(itemId);
        if(quantity>0)
          items[i++]=plant;
       });

      items.map((item,i)=>{
        return <CartItem key={i} id={item._id} name={item.name} photo={item.photo} price={item.price}/>
      })
    }


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
        
        {sendToCartItem()}
       </div>
       <hr/>
       <div className="cart-hishab">
          <div className="cart-hishab-left">
            <p>Total quantity</p>
            <p>Total price</p>
            <p>discounted</p>
          </div>
          <div className="cart-hishab-right">
            <p>{getTotalCartQuantity()}</p>
            <p>{getTotalCartPrice()}</p>
            <p>(-10%)</p>
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