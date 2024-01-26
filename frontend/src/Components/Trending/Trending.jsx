import React, { useContext, useEffect, useState } from 'react'
import './Trending.css'
// import all_plants from '../Assets/all_products'
import Product from '../Product/Product'
import axios from 'axios';
import { CartContext } from '../../Context/CartContext';


const Trending = ({catagory}) => {
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
    <div className='trending'>
      <h1>{catagory}</h1>
    
      <div className= 'tr-products'>
        {all_plants.map((item,i)=>{
             return <Product label='product'key={i} id={item._id} name={item.name} description={item.description} photo={item.photo} rating={item.rating} price={item.price}/>
        })}
      </div>
    </div>
  )
}

export default Trending
