import React, { useRef, useState } from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './Cover.css'
import hand_icon from '../Assets/aronnok-logo.png'
import cover_photo from '../Assets/cover.png'
import { Link } from 'react-router-dom';
// import auction_photo from 'img7.png'

const Cover = ({userId}) => {

    const sliderRef = useRef(null);
  
    const [touchStartX, setTouchStartX] = useState(null);

    const handleTouchStart = (e) => {
      setTouchStartX(e.touches[0].clientX);
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

    <Slider 
    ref={sliderRef}
    {...settings}
    onTouchStart={handleTouchStart}
    onTouchMove={handleTouchMove}>
      <div className='cover'>
          <img src={cover_photo} alt="" />
          
          <div className="cover-text">
              <p>End of year<br/> Special Bids</p>
              <Link to={`/auctionsall/${userId}`}> <button>check them out</button> </Link>
          </div>
      </div>
      <div className='cover'>
          <img src="/a2.jpg" alt="" />
          
          <div className="cover-text">
              <p>Check our auction</p>
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
   
  )
}


export default Cover
