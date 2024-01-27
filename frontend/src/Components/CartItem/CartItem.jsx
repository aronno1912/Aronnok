import React, { useContext, useState } from 'react'
import './CartItem.css'
import cross_btn from '../Assets/cross-btn.jpg';
import { CartContext } from '../../Context/CartContext';

const CartItem = (prod) => {
    
    
    const{cartItems,cartTotalPrice,addToCart,removeFromCart}=useContext(CartContext);
    // const [quantity, setQuantity]=useState(cartItems.get(prod.id));
    // const [total_price, setTotal]=useState(prod.price);

    const increment = () => {
        addToCart(prod.id);
      };

      const decrement = () => {
        removeFromCart(prod.id);
      };

  return (
   <div className="cart-item-container">
    <div className="cart-item-left">
        <img src={prod.photo} alt="" />
        <div className="name-quantity">
            <p style={{fontSize:'17px', color:'rgb(2, 75, 33)'}}>{prod.name}</p>
            <div className="item-quantity">
                <button onClick={decrement}>-</button>
                <p style={{marginTop:"1px"}}>{+cartItems.get(prod.id)}</p>
                <button onClick={increment}>+</button>
            </div>
        </div>
    </div>
    <div className="cart-item-middle">
        <p>${prod.price}</p>
    </div>
    <div className="cart-item-right">
        <button className='remove-btn'><i class="bi bi-x"  style={{ fontSize: '20px' }}></i></button>
        <p><b>${+cartTotalPrice.get(prod.id)}</b></p>
    </div>
    
   </div>
  )
}


export default CartItem
