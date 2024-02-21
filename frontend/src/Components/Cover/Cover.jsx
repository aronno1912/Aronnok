import React, { useRef, useState } from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './Cover.css'
import hand_icon from '../Assets/aronnok-logo.png'
import cover_photo from '../Assets/cover.png'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
// import auction_photo from 'img7.png'
import AuctionAddPlant from '../AuctionAddPlant/AuctionAddPlant';
import SellRequestForm from '../SellRequestForm/SellRequestForm';

const Cover = ({userId}) => {

    const sliderRef = useRef(null);
  
    const [touchStartX, setTouchStartX] = useState(null);

    const handleTouchStart = (e) => {
      setTouchStartX(e.touches[0].clientX);
    };

 
    const [isFormVisible, setFormVisible] = useState(false);
    const showFormHandler = () => {
      setFormVisible(true);
    };
  
    const closeFormHandler = () => {
      setFormVisible(false);
    };



    const handleTouchMove = (e) => {
      if (touchStartX !== null) {
        const touchEndX = e.touches[0].clientX;
        const deltaX = touchEndX - touchStartX;
  
        if (deltaX > 50) {
          // Swipe right, go to previous slide
          sliderRef.current.slickPrev();
        } else if (deltaX < -50) {
          // Swipe left, go to next slide
          sliderRef.current.slickNext();
        }
  
        setTouchStartX(null);
      }
    };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
   <div>
    <Slider 
    ref={sliderRef}
    {...settings}
    onTouchStart={handleTouchStart}
    onTouchMove={handleTouchMove}>
      <div className='cover'>
          <img src={cover_photo} alt="" />
          
          <div className="cover-text">
              <p>Want to sell<br/>Your Plants?</p>
             <button className='sellreqbutton' onClick={showFormHandler}>Drop To Us</button> 
          </div>
      </div>
      <div className='cover'>
          <img src="/a2.jpg" alt="" />
          
          <div className="cover-text2">
              <p>Check our auctions</p>
              <Link to={`/auctionsall/${userId}`}> <button className='cover2button'>check them out</button> </Link>
          </div>

          
      </div>  
      <div className='cover'>
          <img src="/cov3.jpg" alt="" />
       </div>
       <div className='cover'>
          <img src="/cov4.jpg" alt="" />
       </div>
    </Slider>
    {isFormVisible && (
      <SellRequestForm userId={userId} onClose={closeFormHandler} />
    )}
    </div>
   
  );
};


export default Cover
