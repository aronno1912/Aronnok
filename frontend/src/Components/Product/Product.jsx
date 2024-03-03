import React, { useContext, useEffect, useState } from 'react'
import './Product.css'
import plant_img from '../Assets/bansai.jpg'
import { Link } from 'react-router-dom';
import star_dull from '../Assets/star_dull_icon.png'

import star from '../Assets/star_icon.png'
import { CartContext } from '../../Context/CartContext'
import axios from 'axios';

const Product = (prod) => {
  let flag = false;
  console.log('wyhkjabgij')
  console.log(prod.category)


  const [isFav, setIsFav] = useState();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/favourites/${prod.userId}/isFavourite/${prod.id}`);
        const data = await response.json();
        setIsFav(data.flag);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);


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

      const addToFavourites = async() => {
        setIsClicked(!isClicked);
        try {
          await axios.post(`http://localhost:8000/api/favourites/create/${prod.userId}`, { "plantId": prod.id });
        } catch (error) {
          console.error('Error adding', error);
        }
        
      };

      if (prod.category == "comingsoon") {
        flag = true;
      } else {
        flag = false;
      }

  return (
    <div className='product-container2'> 

    <div className='container2'> 
    <Link to={`/${prod.category}/${prod.userId}/${prod.id}`} style={{ textDecoration: 'none'}}>
      <img src={prod.photo} alt=""  style={{ width: '280px', height: '200px' }} />
      </Link>
      <div className="plant-details2">
        <Link to={`/${prod.category}/${prod.userId}/${prod.id}`} style={{ textDecoration: 'none', color:'black'}}>
        <p className='plant-name2'>{prod.name}</p>
        <div className="product-description2">
            <p>{prod.description}</p>
        </div>
        <div className="star-img2">
            {ratingStars()}
        </div>
        {/* <p className='product-price'><b>${prod.price}</b></p> */}
       <p>
       <b>${prod.price}</b>
       {'  '}
       {flag?(''):(<del style={{ color: 'gray' ,size:'10px' }}>${2 * prod.price}</del>  )}
 
  {/* <del style={{ color: 'gray' ,size:'10px' }}>${2 * prod.price}</del> */}
 
 
</p>
</Link>
        <div className="product-footer">
          <button className='love-icon-btn'>  <i
            // className={`bi bi-heart ${isClicked ? 'clicked' : ''}`}
            className={`bi bi-heart ${isClicked ? 'clicked' : ''}`}
            style={{ fontSize: '20px',  border:'black', color: isFav||isClicked==="clicked" ? 'red' : 'black'}}
            onClick={addToFavourites}
          ></i></button>
           

          <button className="buy-btn">Buy</button>    
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product

// className='container-link' 
// style={{ width: '280px', height: '200px' }}