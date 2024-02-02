import React, { useContext,useEffect, useState } from 'react'

import CartItem from '../Components/CartItem/CartItem';
import '../Context/ViewCart.css';
import { CartContext } from '../Context/CartContext';
import axios, { all } from 'axios';
import { ProjectContext } from '../Context/ProjectContext';
import Navbar from '../Components/Navbar/Navbar';
import { useParams } from 'react-router-dom';

const ViewCart = (prod) => {
  const { userId } = useParams();

  const disRate= 0.1;
  const {totalQuantity,updateTotalQuantity}=useContext(ProjectContext);
  const [cart, setCart] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/cart/viewCart/${userId}`);
        const data = await response.json();
        setCart(data);
        setCartItems(data.items);
        console.log("excuse me");
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
    // updateTotalQuantity();
  }, [cart]);


  const placeOrder = async () => {
    try {
      // console.log(totalQuantity);
      await axios.post(`http://localhost:8000/api/order/create/${userId}`, {});
      console.log('product added to cart');
      alert('Your Order is placed successfully!');
    } catch (error) {
      console.error('Error adding', error);
    }
  };

  const handleAddress=(e)=>{
    setAddress(e.target.value);
  }

  return (
    <div>
    <Navbar/>
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
          return <CartItem key={i} id={item.product} quantity={item.quantity} userId={userId}/>
        })}
        {/* {sendToCartItem()} */}
       </div>
       <hr/>
       <div className="cart-hishab">
          <div className="cart-hishab-left">
          <p>Total quantity</p>
            <p>Total price</p>
            <p>Enter address:</p>
          </div>
          <div className="cart-hishab-right">
            <p>{totalQuantity}</p>
            <p style={{textAlign:"right"}}><b>${Math.round(cart.total)}</b></p>
            <input
              type="text"
              id="textInput"
              value={address}
              onChange={handleAddress}
            />
          </div>
       </div>
       <hr/>
       <div className="cart-place-order">
        <button className="cart-place-order-btn" onClick={placeOrder}>place order</button>
       </div>
    </div>
    </div>
  )
}


export default ViewCart

// {all_plants.map((item,i)=>{
//   return <CartItem key={i} id={item._id} name={item.name} photo={item.photo} price={item.price}/>
// })}