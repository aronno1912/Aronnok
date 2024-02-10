import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../Components/Navbar/Navbar';
import '../Context/ongoingAuctionAdmin.css';
import Product from '../Components/Product/Product';
import CountdownTimer from '../Components/CountdownTimer/CountdownTimer';
import AdAuctionProduct from '../Components/AuctionProduct/AdAuctionProduct';
import AdminNavbar from '../Components/AdminNavbar/AdminNavbar';

const OngoingAucAdmin = () => {
  const {userId,auctionId}=useParams();

  const [auction,setAuction]=useState({});
  const [products,setProducts]=useState([]);
  const [topProducts,setTopProducts]=useState([]);
  const [date, setDate] = useState("");
  const [start,setStart] = useState(new Date());
  const [end,setEnd] = useState(new Date());
  const [remainingTime,setRtime]=useState(2100);
  const [isOver,setIsOver]=useState(false);

   
  useEffect(() => {
    const fetchTime = async ()=>{
      try {
        const response = await fetch(`http://localhost:8000/api/auction/${auctionId}/remainingTime`);
        const data = await response.json();
        setRtime(Number(Number(data.hour)*3600+Number(data.min)*60+Number(data.sec)));
        console.log(Number(Number(data.hour)*3600+Number(data.min)*60+Number(data.sec)));
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
     }
     fetchTime();

  }, []);


  useEffect(() => {
    const fetchOrder = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/auction/get-auction/${auctionId}`);
            const data = await response.json();
            setAuction(data);
            setDate(data.date.substring(0, 10));
            setStart(new Date(data.startTime));
            setEnd(new Date(data.endTime));
        } catch (error) {
          console.error('Error fetching product data:', error);
        }
      };

      const fetchProducts = async ()=>{
        try {
          const response = await fetch(`http://localhost:8000/api/auction/${auctionId}/products`);
          const data = await response.json();
          setProducts(data);
          console.log(products);
        } catch (error) {
          console.error('Error fetching product data:', error);
        }
       }

       const fetchTopProducts = async ()=>{
        try {
          const response = await fetch(`http://localhost:8000/api/auction/${auctionId}/top`);
          const data = await response.json();
          setTopProducts(data);
          console.log(products);
        } catch (error) {
          console.error('Error fetching product data:', error);
        }
       }

      //  const checkTimeEnd = ()=>{
      //   if(remainingTime<=0)
      //     setIsOver(true);
      //  }

      
     const intervalId = setInterval(() => {
      fetchOrder();
      fetchProducts();
      fetchTopProducts();
      setRtime((prevTime) =>{
        if(prevTime>0) return prevTime-1;
        else {setIsOver(true); return 0;}
      });
      // checkTimeEnd();
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const handleTimerEnd = () => {
    console.log('Timer ended!'); // You can perform any action when the timer reaches 0
  };

  const formatTime = () => {
    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = remainingTime % 60;

    const padZero = (value) => (value < 10 ? `0${value}` : value);

    return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
  };
 
 
  return (
    <div>
      <AdminNavbar/>
      <div className="oneauction-headers">
          <div className="adminoneauction-dateTime">
            <p><b>Date: {date}</b></p>
            <p><b>Start time: {start.getHours().toString().padStart(2, '0')}:{start.getMinutes().toString().padStart(2, '0')}:{start.getSeconds().toString().padStart(2, '0')}</b></p>
          </div>

          {!isOver &&( <div className="adminoneauction-timeremaining">
            <p style={{fontSize:'22px'}}><b>Time remaining: {formatTime()}</b></p>
          </div>)}
          <div className="adminoneauction-totalsold">
          <p><b>End time: {end.getHours().toString().padStart(2, '0')}:{end.getMinutes().toString().padStart(2, '0')}:{end.getSeconds().toString().padStart(2, '0')}</b></p>
          </div>  
      </div>


      <div className='trending'>
      <h1>Highest bid products</h1>
      <div className= 'tr-products'>
        {topProducts.map((item,i)=>{
             return <AdAuctionProduct label='product'key={i} id={item._id} userId={userId} name={item.name} description={item.description} photo={item.photo} highestBidder={item.highestBidder} currentBid={item.currentBid} auctionId={auctionId}/>
        })}
      </div>
      </div>

      <div className='trending'>
      <h1>All Products</h1>
      <div className= 'tr-products'>
        {products.map((item,i)=>{
             return <AdAuctionProduct label='product'key={i} id={item._id} userId={userId} name={item.name} description={item.description} photo={item.photo} highestBidder={item.highestBidder} currentBid={item.currentBid} auctionId={auctionId}/>
        })}
      </div>
      </div>

    </div>
  )
}

export default OngoingAucAdmin
