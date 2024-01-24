import React from 'react'
import './Product.css'
import plant_img from '../Assets/bansai.jpg'
import star from '../Assets/rating_star.jpg'
import { Link } from 'react-router-dom';

const Product = (prod) => {
  
    const ratingStars = () => {
        const result = [];
        for (let i = 0; i < prod.rating; i++) {
          result.push(<img src={star} alt=""/>);
        }
        return result;
      };

  return (
    <Link to={`/product/${prod.id}`}className='container-link'>
    <div className='container'> 
    
      <img src={prod.photo} alt="" />
      
      {/* <img src={plant_img} alt="" /> */}
      
      <div className="plant-details">
        <p className='plant-name'>{prod.name}</p>
        <div className="description">
            <p>{prod.description}</p>
        </div>
        <div className="star-img">
            {ratingStars()}
        </div>
        <p className='price'>{prod.price}</p>
        <button className="buy-btn">Buy</button>    
      </div>
    </div>
    </Link>
   
  )
}

export default Product
