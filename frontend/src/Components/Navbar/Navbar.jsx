import React, { useState } from 'react'
import './Navbar.css'
import logo from '../Assets/aronnok-logo.png'
import cart_icon from '../Assets/cart-icon.jpg'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [menu,setMenu]= useState("home"); 
  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <img src={logo} alt=""/>
        <p>Aronnok</p>
      </div>
      <ul className="nav-menu">
        <li onClick={()=>{setMenu("home")}}><Link to='/' style={{textDecoration:'none'}}>Home </Link> {menu==="home"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("favourites")}}><Link to='/favourites' style={{textDecoration:'none'}}> Favourites </Link>  {menu==="favourites"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("wishlist")}}><Link to='/wishlist' style={{textDecoration:'none'}}> Wishlist </Link>  {menu==="wishlist"?<hr/>:<></>}</li>
      </ul>
      <div className="nav-login-cart">
        <Link to='/login' className='login-btn'>Login</Link>
        <Link to='/viewcart'> <img src={cart_icon} alt="" /> </Link>
        <div className="nav-cart-count">
            0
        </div>
      </div>
    </div>
  )
}

export default Navbar
