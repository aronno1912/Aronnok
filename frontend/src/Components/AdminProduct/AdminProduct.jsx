import React, { useContext, useState } from 'react'
import './AdminProduct.css'
import plant_img from '../Assets/bansai.jpg'
import { Link } from 'react-router-dom';
import star_dull from '../Assets/star_dull_icon.png'

import star from '../Assets/star_icon.png'


const AdminProduct = (prod) => {
  
    const ratingStars = () => {
        const result = [];
        for (let i = 0; i < prod.rating; i++) {
          result.push(<img src={star} alt=""/>);
        }
        for (let i = prod.rating; i < 5; i++) {
          result.push(<img src={star_dull} alt=""/>);
        }
        return result;
      };

      const [isClicked, setIsClicked] = useState(false);

      const addToFavourites = () => {
        setIsClicked(!isClicked);
      };

  return (
    <Link to={`/product/${prod.id}`}className='container-link' style={{ textDecoration: 'none', color: 'black' }}>
    <div className='product-container'> 

    <div className='container'> 
      <img src={prod.photo} alt="" style={{ width: '280px', height: '200px' }} />

      <div className="plant-details">
        <p className='plant-name'>{prod.name}</p>
        <div className="product-description">
            <p>{prod.description}</p>
        </div>
        <div className="star-img">
            {ratingStars()}
        </div>
        <p className='product-price'><b>${prod.price}</b></p>
        <p classname='sold'>Sold: {prod.sold}</p>
        <p classname='stock'>Stock: {prod.stock}</p>
        <div className="product-footer">    
          </div>
        </div>
      </div>
    </div>
    </Link>
  )
}

export default AdminProduct
