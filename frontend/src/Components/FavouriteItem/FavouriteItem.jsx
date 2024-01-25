import React, { useEffect, useState } from 'react'
import './FavouriteItem.css'
// import all_plants from '../Assets/all_products'
import Product from '../Product/Product'
import axios from 'axios';


const FavouriteItem = ({catagory}) => {
  const [all_plants, setProducts] = useState([]);
 
  // useEffect(()=>{
  //   fetch('http://localhost:3000/api/products')
  //   .then((response)=>response.json())
  //   .then((data)=>setProducts(data))
  //   .catch((error) => console.error('Error fetching data:', error));
  // },[])
    
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <div className='FavouriteItem'>
      <h1>{catagory}</h1>
    
      <div className= 'fr-products'>
        {all_plants.map((item,i)=>{
             return <Product label='product'key={i} id={item._id} name={item.name} description={item.description} photo={item.photo} rating={item.rating} price={item.price}/>
        })}
      </div>
    </div>
  )
}

export default FavouriteItem
