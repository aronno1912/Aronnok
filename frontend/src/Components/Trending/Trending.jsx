import React, { useState } from 'react'
import './Trending.css'
import all_plants from '../Assets/all_products'
import Product from '../Product/Product'

const Trending = ({catagory}) => {

const Trending = () => {
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
