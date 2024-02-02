import React, { useEffect, useState } from 'react'
import AuctionSmall from '../Components/AuctionsSmall/AuctionSmall';

const AuctionsAll = (prod) => {
    const [auctions, setAuctions] = useState([]);
    const [ongoing, setOngoing] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [completed, setCompleted] = useState([]);
 
  useEffect(() => {
    const divideOrders = async (orders) => {
        setOngoing([]);
        setUpcoming([]);
        setCompleted([]);
       
        for (const auction of auctions) {
          if(auction.status==="ongoing"){
            setOngoing((prevOrders) => [...prevOrders, auction]);
            // setTotalCurPrice(totalCurPrice+order.amount);
          }
          else if(auction.status==="upcoming"){
            setUpcoming((prevOrders) => [...prevOrders, auction]);
          }
          else if(auction.status==="completed"){
            setCompleted((prevOrders) => [...prevOrders, auction]);
          }
        }
        
        };
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/auctions`);
        const data = await response.json();
        setAuctions(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <div className='auctionall'>
        <div className="auctionall-ongoing">
            <h1>Ongoing</h1>
        
            <div className= 'tr-auctions'>
            {ongoing.map((item,i)=>{
                return <AuctionSmall key={i} id={item._id} name={item.name} startTime={item.startTime} endTime={item.endTime} date={item.date} status={item.status}/>
            })}
            </div>
        </div>
        <div className="auctionall-ongoing">
            <h1>Ongoing</h1>
        
            <div className= 'tr-auctions'>
            {ongoing.map((item,i)=>{
                return <AuctionSmall key={i} id={item._id} name={item.name} startTime={item.startTime} endTime={item.endTime} date={item.date} status={item.status}/>
            })}
            </div>
        </div>
        <div className="auctionall-ongoing">
            <h1>Ongoing</h1>
        
            <div className= 'tr-auctions'>
            {ongoing.map((item,i)=>{
                return <AuctionSmall key={i} id={item._id} name={item.name} startTime={item.startTime} endTime={item.endTime} date={item.date} status={item.status}/>
            })}
            </div>
        </div>
        
    </div>
  )
}

export default AuctionsAll
