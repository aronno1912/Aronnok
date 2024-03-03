import React, { useEffect, useState } from 'react'
import AuctionSmall from '../Components/AuctionsSmall/AuctionSmall';
import '../Context/AdminViewAuctionPage.css'
import Navbar from '../Components/Navbar/Navbar';
import { useParams } from 'react-router-dom';
import AdminNavbar from '../Components/AdminNavbar/AdminNavbar';
import Sidebar from '../Components/Sidebar/Sidebar';
import PastAuctionSmall from '../Components/AuctionsSmall/PastAuctionSmall';

const AdminViewAuctionPage = () => {
    const { userId } = useParams();
    
    const [auctions, setAuctions] = useState([]);
    const [ongoing, setOngoing] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [completed, setCompleted] = useState([]);
 
  useEffect(() => {
    const divideOrders = async (auctions) => {
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
        divideOrders(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [auctions]);

  return (
    <div className='aauctionall'>
        <div className="heresidebar">
        <Sidebar/>
        <div className="heresidebar-body">
        <AdminNavbar/>
        
        
        <div className="aauctionall-ongoing">
            {/* <h1>     </h1>
            <h1>     </h1>
            <h1>     </h1> */}
            <h1 style={{marginLeft:'15px'}}> Ongoing</h1>

            <div className='atr-auctions'>
  {ongoing.length === 0 ? (
    <p className='no-auctions-message'>No ongoing auctions</p>
  ) : (
    ongoing.map((item, i) => (
      <PastAuctionSmall
        key={i}
        id={item._id}
        userId={userId}
        name={item.name}
        startTime={item.startTime}
        endTime={item.endTime}
        date={item.date}
        status={item.status}
        photo={"/auction_photo.jpg"}
        
      />
    ))
  )}
</div>
        </div>
        <div className="aauctionall-ongoing">
            <h1 style={{marginLeft:'15px'}}>Upcoming</h1>
        
            <div className= 'atr-auctions'>
            {upcoming.map((item,i)=>{
                return <PastAuctionSmall key={i} id={item._id} name={item.name} startTime={item.startTime} endTime={item.endTime} date={item.date} status={item.status} photo={"/auction_photo.jpg"} />
            })}
            </div>
        </div>
        <div className="aauctionall-ongoing">
            <h1 style={{marginLeft:'15px'}}>Previous auctions</h1>
        
            <div className= 'atr-auctions'>
            {completed.map((item,i)=>{
                return <PastAuctionSmall key={i} id={item._id} name={item.name} startTime={item.startTime} endTime={item.endTime} date={item.date} status={item.status} photo={"/auction_photo.jpg"} />
            })}
            </div>
        </div>
        
        
    </div>
    </div>
    </div>
    
  )
}

export default AdminViewAuctionPage
