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
import AuctionWinitem from '../AuctionWinitem/AuctionWinitem';

const Cover = ({userId}) => {

    // const sliderRef = useRef(null);
    const sliderRef = React.createRef();
  
    const [touchStartX, setTouchStartX] = useState(null);
    const [time,setTime]=useState({});
    const [hours,setHours]=useState();
    const [minutes,setMinutes]=useState();
    const [seconds,setSeconds]=useState();
    const [isTimeZero,setTimeZero]=useState(false);
    

    useEffect(() => {
      const fetchTime = async ()=>{
        try {
          const response = await fetch(`http://localhost:8000/api/auction/remainingTime`);
          const data = await response.json();
          setTime(Number(Number(data.hour)*3600+Number(data.min)*60+Number(data.sec)));
          console.log(Number(Number(data.hour)*3600+Number(data.min)*60+Number(data.sec)));
        } catch (error) {
          console.error('Error fetching product data:', error);
        }
      }
       fetchTime();

      }, []);
      
      useEffect(() => {


       const intervalId = setInterval(() => {
    
        setTime((prevTime) =>{
          if(prevTime>0)
          {
            setHours(Math.floor(prevTime / 3600));
            setMinutes(Math.floor((prevTime % 3600) / 60));
            setSeconds(prevTime % 60);
            return prevTime-1;
          }
          else { setTimeZero(true); return 0;}
        });
        
      }, 1000);

      return () => clearInterval(intervalId);
  
    }, []);



    const padZero = (value) => (value < 10 ? `0${value}` : value);

    // const formatTime = () => {
    //   setHours(Math.floor(time / 3600));
    //     setMinutes(Math.floor((time % 3600) / 60));
    //     setSeconds(time % 60);

    //   let result=[];
    //   result.push(
        
    //   );
    //   return result;
    // }

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
    autoplay: true,
   autoplaySpeed: 3000,
  };

  const coverTime = {
   display:'flex',
   gap: '4px',
   marginTop:'100px'
  };

  const coverTimeText = {
    backgroundColor: 'rgb(252, 135, 62)',
    color: 'rgb(84, 53, 9)',
    height: '40px',
    width: '40px',
    fontSize: '25px',
    marginTop:'25px',
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
              {time!==0 && (
                <div classname='cover-Auction-time' style={coverTime}>
                <p style={{fontSize: '25px',color: 'white'}}>Auction ending in : </p>
                <div classname='cover-time-text' style={coverTimeText}><p style={{fontSize: '25px', marginTop:'0px' ,color: 'white'}}>{padZero(hours)}</p></div>
                <p style={{fontSize: '25px',color: 'white'}}>:</p>
                <div classname='cover-time-text' style={coverTimeText}><p style={{fontSize: '25px',marginTop:'0px',color: 'white'}}>{padZero(minutes)}</p></div>
                <p style={{fontSize: '25px',color: 'white'}}>:</p>
                <div classname='cover-time-text' style={coverTimeText}><p style={{fontSize: '25px',marginTop:'0px',color: 'white'}}>{padZero(seconds)}</p></div>
              </div>
          )}
              
            

          </div>

          
      </div>  
      <div className='cover'>
          <img src="/hellos.jpg" alt="" />
       </div>
       <div className='cover'>
          <img src="/cov11.jpg" alt="" />
       </div>
    </Slider>
    {isFormVisible && (
      <SellRequestForm userId={userId} onClose={closeFormHandler} />
    )}
    </div>
   
  );
};


export default Cover
