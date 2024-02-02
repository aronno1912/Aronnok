import React from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './Cover.css'
import hand_icon from '../Assets/aronnok-logo.png'
import cover_photo from '../Assets/cover.png'
import { Link } from 'react-router-dom';
// import auction_photo from 'img7.png'

const Cover = () => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      <div className='cover'>
          <img src={cover_photo} alt="" />
          
          <div className="cover-text">
              <p>End of year<br/> Special Bids</p>
              <button>check them out</button>
          </div>
      </div>
      <div className='cover'>
          <img src="/cover2.png" alt="" />
          
          <div className="cover-text">
              <p>Check our auction</p>
              <Link to={`/auctionsall`}> <button>check them out</button> </Link>
          </div>
      </div>  
    </Slider>
  )
}


export default Cover
