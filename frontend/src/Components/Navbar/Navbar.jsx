import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css'
import logo from '../Assets/aronnok-logo.png'
import cart_icon from '../Assets/cart-icon.jpg'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'
import UserNotification from '../UserNotification/UserNotification'

const Navbar = ({userId}) => {
  const [menu,setMenu]= useState("home"); 
  const [cartTotalQuantity, setQuantity] = useState(0);

  const [isPopupOpen, setPopupOpen] = useState(false);

    const openPopup = () => {
        setPopupOpen(true);
      };
    
      const closePopup = () => {
        setPopupOpen(false);
      };
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/products/659c027001b07da1b7fef185');
        const data = await response.json();
        setQuantity(data.total);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <img src={logo} alt=""/>
        <p>Aronnok</p>
      </div>
      <ul className="nav-menu">
        <li onClick={()=>{setMenu("home")}}><Link to={`/home/${userId}`} style={{textDecoration:'none'}}>Home </Link> {menu==="home"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("favourites")}}><Link to='/favourites' style={{textDecoration:'none'}}> Favourites </Link>  {menu==="favourites"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("wishlist")}}><Link to='/wishlist' style={{textDecoration:'none'}}> Wishlist </Link>  {menu==="wishlist"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("orders")}}><Link to={`/orderlist/${userId}`} style={{textDecoration:'none'}}>Order </Link> {menu==="orders"?<hr/>:<></>}</li>
      </ul>
      <div className="nav-login-cart">
          <div className="notification-icon"><button style={{backgroundColor:"white", fontSize:'30px'}} onClick={openPopup}>🔔</button>
            <div className="notification-count">0</div>
          </div>
          
        <Link to={`/viewcart/${userId}`}> <img src={cart_icon} alt="" /> </Link>
        {/* <Link to='/' className='login-btn'>Logout</Link> */}
        <div className="nav-cart-count">
            0
        </div>
        <Link to={`/profile/${userId}`}> 
        <img src="/us.png" alt="" /> </Link>
      </div>
         {isPopupOpen && (
            <div className="notification-overlay">
            <div className="notification-popup">
              
              <UserNotification userId={userId} onClose={closePopup}/>
        
            </div>
          </div>
        ) }  
    </div>
  )
}

export default Navbar
