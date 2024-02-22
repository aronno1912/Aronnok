import React, { useContext,useEffect, useState } from 'react'

import CartItem from '../Components/CartItem/CartItem';
import '../Context/ViewCart.css';
import { CartContext } from '../Context/CartContext';
import axios, { all } from 'axios';
import { ProjectContext } from '../Context/ProjectContext';
import Navbar from '../Components/Navbar/Navbar';
import { Link, useParams } from 'react-router-dom';
import Footer from '../Components/Footer/Footer';

const ViewCart = (prod) => {
  const { userId } = useParams();

  const disRate= 0.1;
  const [totalQuantity,setTotalQuantity]=useState();
  const [totalPrice,setTotalPrice]=useState();
  const [cart, setCart] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/cart/viewCart/${userId}`);
        const data = await response.json();
        setCart(data);
        setCartItems(data.items);
        // console.log("excuse me");
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const getPrice = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/product/${prod.userId}/${prod.id}`);
        const data = await response.json();
        return data.price;
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    const getTotalQuantity = async () => {
        let total=0;
        // let totPrice=0;
        cartItems.map((item)=>{
          console.log("eitaaaaaaaaaaaaaaaaaaaa "+item.quantity);
            total+=item.quantity;
            // totPrice+=getPrice();
          });   
        setTotalQuantity(total);
        // setTotalPrice(totPrice);
    };

    const intervalId = setInterval(() => {
      fetchData();
      getTotalQuantity();
    }, 3000);

    return () => clearInterval(intervalId);
  }, [cartItems]);


  const placeOrder = async () => {
    try {
      console.log(address);
      const response=await axios.put(`http://localhost:8000/api/cart/buynow/${userId}`, {"address":address});
      console.log("response")
      console.log(response.data.url);
      const textUrl=response.data.url;
      
      console.log('product added to cart');
      //alert('Your Order is placed successfully!');
      // windows.location.replace(response.data.url)
      window.location.href = textUrl;
    } catch (error) {
      console.error('Error adding', error);
    }
  };

  const defaultMessage = 'Enter description';

  // Determine the value and style based on whether the text box is empty
  const displayValue = address || defaultMessage;
  const textColor = address ? 'black' : 'grey';

  const handleAddress=(e)=>{
    setAddress(e.target.value);
  }

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };


  return (
    <div>
    <Navbar userId={userId}/>
    <div className="cart-all">
      <div className="cartItems-totalsbox">
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
        <div className="viewcartTotals">
              <p><b>Total quantity: {totalQuantity}</b></p>
              <hr/>
              <p><b>Total price: ${Math.round(cart.total)}</b></p>
              <hr/>
              <p><b>Delivery fee: +$4</b></p>
              <hr/>
              <p><b>Total: ${Math.round(cart.total+4)}</b></p>
              <hr/>
        </div>
      </div>
       
       <hr style={{marginTop:"100px"}}/>
       <div className="cart-hishab">
          <div className="cart-hishab-address">
            <p>Enter billing address:</p>
            <input style={{width: '180px', height: '140px',color: textColor, textAlign:"start"}}
                type="text"
                id="textInput"
                value={address}
                onChange={handleAddress}
                placeholder='Enter address'
            />
          </div>
          <div className="cart-hishab-payment">
            <p>Payment method:</p>
            <div className="cart-hishab-payment-option">
              <label style={{display:'flex',width:'20px',height:'20px'}}>
                <input
                  type="radio"
                  value="option1"
                  checked={selectedOption === 'option1'}
                  onChange={handleOptionChange}
                />
                Cash on delivery
              </label>

              <label style={{display:'flex',width:'20px',height:'20px'}}>
                <input
                  type="radio"
                  value="option2"
                  checked={selectedOption === 'option2'}
                  onChange={handleOptionChange}
                />
                bkash
              </label>
            </div>
          </div>
       </div>
       <hr/>
       <div className="cart-place-order">
        <button className="cart-place-order-btn" onClick={placeOrder}>place order</button>
       </div>
    </div>
    <Footer/>
    </div>
  )
}


export default ViewCart

// {all_plants.map((item,i)=>{
//   return <CartItem key={i} id={item._id} name={item.name} photo={item.photo} price={item.price}/>
// })}