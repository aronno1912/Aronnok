import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../Components/Navbar/Navbar';
import '../Context/OneAuction.css';
import Product from '../Components/Product/Product';
import CountdownTimer from '../Components/CountdownTimer/CountdownTimer';
import AdAuctionProduct from '../Components/AuctionProduct/AdAuctionProduct';

const OngoingAucAdmin = () => {
  const {userId,auctionId}=useParams();

  const [auction,setAuction]=useState({});
  const [products,setProducts]=useState([]);
  const [topProducts,setTopProducts]=useState([]);
  const [date, setDate] = useState("");
  const [start,setStart] = useState(new Date());
  const [end,setEnd] = useState(new Date());
  const [remainingTime,setRtime]=useState(2100);

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

     fetchOrder();
     fetchProducts();
     fetchTopProducts();
     fetchTime();

  }, []);

  const handleTimerEnd = () => {
    console.log('Timer ended!'); // You can perform any action when the timer reaches 0
  };
 
  return (
    <div>
      <Navbar/>
      <div className="oneauction-headers">
          <div className="oneauction-dateTime">
            <p><b>Date: {date}</b></p>
            <p><b>Start time: {start.getHours().toString().padStart(2, '0')}:{start.getMinutes().toString().padStart(2, '0')}:{start.getSeconds().toString().padStart(2, '0')}</b></p>
          </div>
          <div className="oneauction-timeremaining">
            <p><b><CountdownTimer initialTime={remainingTime} onTimerEnd={handleTimerEnd}/></b></p>
          </div>
          <div className="oneauction-totalsold">
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
