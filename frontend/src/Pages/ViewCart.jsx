import React, { useEffect, useState } from 'react'

import CartItem from '../Components/CartItem/CartItem';
import '../Context/ViewCart.css';

const ViewCart = (prod) => {
    const [all_plants, setProducts] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:8000/api/products');
          const data = await response.json();
          setProducts(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      fetchData();
    }, []);

  return (
    <div className="cart-all">
       <div className='cart-items'>
        <p style={{fontSize:'25px'}}><b>Cart items</b></p>
        <hr/>
        <div className="cart-items-header">
          <p><b>Products</b></p>
          <p><b>Sub Total  </b></p>
        </div>
        {all_plants.map((item,i)=>{
             return <CartItem label='product'key={i} id={item._id} name={item.name} photo={item.photo} price={item.price}/>
        })}
       </div>
       <hr/>
       <div className="cart-hishab">
          <div className="cart-hishab-left">
            <p>Total quantity</p>
            <p>Total price</p>
            <p>discounted</p>
          </div>
          <div className="cart-hishab-right">
            <p>Total quantity</p>
            <p>Total price</p>
            <p>discounted</p>
          </div>
       </div>
    </div>
    
  )
}


export default ViewCart

