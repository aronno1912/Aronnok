import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css'
import logo from '../Assets/aronnok-logo.png'
import cart_icon from '../Assets/cart-icon.jpg'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'
import axios from 'axios';
import UserNotification from '../UserNotification/UserNotification'
import SearchDropDown from '../SearchDropDown/SearchDropDown'

const Navbar = ({ userId }) => {
  const [menu, setMenu] = useState("home");
  const [cartTotalQuantity, setQuantity] = useState(0);
  const [notis, setNotis] = useState([]);
  const [query,setQuery]=useState('');
  const [suggestions,setSuggestions]=useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };


  const handleChange = async (event) => {
    const { value } = event.target;
    setQuery(value);

    try {
      const response = await fetch(`http://localhost:8000/api/search?query=${query}`);
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/cart/viewCart/${userId}`);
        const data = await response.json();
        const totalQuantity = data.items.reduce((total, item) => total + item.quantity, 0);
        setQuantity(totalQuantity);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchNotification = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/notification/${userId}`);
        const data = await response.json();
        setNotis(data.messages);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };



    const intervalId = setInterval(() => {
      fetchData();
      fetchNotification();
    }, 5000);

    return () => clearInterval(intervalId);

  }, []);

  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <img src={logo} alt="" />
        <p>Aronnok</p>
      </div>
      <ul className="nav-menu">
        <li onClick={() => { setMenu("home") }}><Link to={`/home/${userId}`} style={{ textDecoration: 'none' }}>Home </Link> {menu === "home" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("favourites") }}><Link to={`/favourites/${userId}`} style={{ textDecoration: 'none' }}> Favourites </Link>  {menu === "favourites" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("wishlist") }}><Link to={`/wishlist/${userId}`} style={{ textDecoration: 'none' }}> Wishlist </Link>  {menu === "wishlist" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("orders") }}><Link to={`/orderlist/${userId}`} style={{ textDecoration: 'none' }}>Order </Link> {menu === "orders" ? <hr /> : <></>}</li>
      </ul>

      <div className="usersearch-bar">
        <input type="text" placeholder="Search" value={query} onChange={handleChange} required />
        <div className="navbarscrollable-box">
          <ul>
            {suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion.name}</li>
            ))}
          </ul>
        </div>
        <button className="usersearchbutton" type="button">Search</button>
      </div>

      <div className="nav-login-cart">
        <div className="notification-icon"><button style={{ backgroundColor: "white", fontSize: '30px' }} onClick={openPopup}><i class="bi bi-bell-fill" style={{ color: 'rgb(0, 100, 0)', fontSize: '25px' }}></i></button>
          <div className="notification-count" style={{ fontSize: '10px' }}>{notis.length}</div>
        </div>

        <Link to={`/viewcart/${userId}`}> <img src={cart_icon} alt="" style={{ width: '40px', height: '40px' }} /></Link>
        {/* <Link to='/' className='login-btn'>Logout</Link> */}
        <div className="nav-cart-count" style={{ fontSize: '10px' }}>
          {cartTotalQuantity}
        </div>
        <Link to={`/profile/${userId}`}>
          <img src="/us.png" alt="" style={{ width: '30px', height: '30px' }} /> </Link>
      </div>
      {isPopupOpen && (
        <div className="notification-overlay">

          <UserNotification userId={userId} onClose={closePopup} />

        </div>
      )}
    </div>
  )
}

export default Navbar
