import React, { useEffect, useState } from 'react'
import '../Context/AdminDashboard.css'
import AdminNavbar from '../Components/AdminNavbar/AdminNavbar'
import Sidebar from '../Components/Sidebar/Sidebar'
import Footer from '../Components/Footer/Footer'
import LineChart from '../Components/LineChart/LineChart';
import { Link, useParams } from 'react-router-dom'
import BestSellerItem from '../Components/BestSellerItem/BestSellerItem'
import Calendar from '../Components/Calender/Calendar'
import AdDashOrderItem from '../Components/AdDashOrderItem/AdDashOrderItem'
import PieChart from '../Components/PieChart/PieChart'
import Histogram from '../Components/Histogram/Histogram'

const AdminDashboard = () => {
    
    const [products, setProducts] = useState([]);
    const [userNo, setUserNo] = useState();
    const [aucTime, setAucTime] = useState();
    const [orders, setOrders] = useState([]);
    const [auctionId, setAuctionId] = useState([]);

    useEffect(() => {
        const fetchTime = async ()=>{
            try {
              const response = await fetch(`http://localhost:8000/api/auction/remainingTime`);
              const data = await response.json();
              setAucTime(Number(Number(data.hour)*3600+Number(data.min)*60+Number(data.sec)));
              setAuctionId(data.auctionId)
            } catch (error) {
              console.error('Error fetching product data:', error);
            }
           }
           fetchTime();
    }, []);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/products/get/bestSellers`);
                const data = await response.json();
                setProducts(data);
            } catch (error) {
              console.error('Error fetching product data:', error);
            }
          };

          const fetchUsers = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/getAllUser`);
                const data = await response.json();
                setUserNo(data.length);
            } catch (error) {
              console.error('Error fetching product data:', error);
            }
          };
          
        
          const fetchAllOrders = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/order/activeOrders`);
                const data = await response.json();
                setOrders(data);
            } catch (error) {
              console.error('Error fetching product data:', error);
            }
          };

          const intervalId = setInterval(() => {
            fetchProduct();
            fetchUsers();
            setAucTime((prevTime) =>{
                if(prevTime>0) return prevTime-1;
                else { return 0;}
              });
            fetchAllOrders();
            // checkTimeEnd();
          }, 1000);
      
          // Clear the interval when the component unmounts
          return () => clearInterval(intervalId);
       
      }, []);

      const formatTime = () => {
        const hours = Math.floor(aucTime / 3600);
        const minutes = Math.floor((aucTime % 3600) / 60);
        const seconds = aucTime % 60;
    
        const padZero = (value) => (value < 10 ? `0${value}` : value);
    
        return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
      };

  return (
    <div>
        <AdminNavbar/>
        <div className="admindashboard-body">
            <Sidebar/>
            <div className="dashboard-admin">
                <div className="dashboardTitle">
                    <p style={{fontSize:'25px'}}><b>Dashboard</b></p>
                    {/* <hr style={{width:"150px", margin:"0", border:"2px solid", borderRadius:"10px"}}/> */}
                </div>
                <div className="dashboard-cards">
                    <Link to={`/allusers`} style={{textDecoration: 'none'}}>
                    <div className="db-totalsale">
                            <div className="db-graphIcon">
                                <i class="bi bi-bar-chart-fill" style={{fontSize:'35px' , color:'rgb(67, 80, 198)'}}></i>
                            </div>
                            
                            <div className="db-tatalsale-text">
                                <p><b>Total Users</b></p>
                                <p style={{marginTop:'1px'}}><b>{userNo}</b></p>
                            </div>
                    </div>
                    </Link>
                    <div className="db-totalsale">
                        <div className="db-graphIcon">
                            <i class="bi bi-currency-dollar" style={{fontSize:'35px' , color:'rgb(67, 80, 198)'}}></i>
                        </div>
                        
                        <div className="db-tatalsale-text">
                            <p><b>Current month Sale</b></p>
                            <p style={{marginTop:'1px'}}><b>$934.99</b></p>
                        </div>
                    </div>

                    <Link to={`/admin/viewauctions/ongoing/${auctionId}`} style={{textDecoration: 'none'}}>
                    <div className="db-totalsale">
                        <div className="db-graphIcon">
                            <i class="bi bi-clock-fill" style={{fontSize:'35px' , color:'rgb(67, 80, 198)'}}></i>
                        </div>
                        
                        <div className="db-tatalsale-text">
                            <p><b>Auction time</b></p>
                            <p style={{marginTop:'1px', color:'red'}}><b>{formatTime()}</b></p>
                        </div>
                    </div>
                    </Link>
                    
                    <div className="db-totalsale">
                        <div className="db-graphIcon">
                            <i class="bi bi-bag-check-fill" style={{fontSize:'35px' , color:'rgb(67, 80, 198)'}}></i>
                        </div>
                        
                        <div className="db-tatalsale-text">
                            <p><b>Active orders</b></p>
                            <p style={{marginTop:'1px'}}><b>{orders.length}</b></p>
                        </div>
                    </div>

                </div>

                <div className="db-middlepart">
                    <div className="db-graphplot">
                        <LineChart/>
                    </div>
                    <div className="db-bestSellers">
                        <div className="db-bestsellers-title">
                            <p style={{fontSize:'25px', marginLeft:'22px', color:'rgb(52, 57, 83)' }}><b>best sellers</b></p>
                            {/* <hr style={{width:"100%", margin:"0", border:"1px solid", borderRadius:"10px"}}/> */}
                        </div>
                        <div className="db-bestsellers-products">
                        
                            {products.map((item,i)=>{
                            return <BestSellerItem key={i} id={item.id} name={item.name} photo={item.photo} sold={item.sold} price={item.price}/>
                            })}
                            
                        </div>
                    </div>
                </div>

                <div className="db-lastpart">
                    <div className="db-orders">
                        <div className="db-bestsellers-title">
                            <p style={{fontSize:'25px', marginLeft:'22px', color:'rgb(52, 57, 83)' }}><b>Active orders</b></p>
                        </div>
                        <div className="db-order">
                            {orders.map((item,i)=>{
                                return <AdDashOrderItem key={i} id={item._id} status={item.status} amount={item.amount} userId={item.user}/>
                            })}
                        </div>
                    </div>
                   
                    <div className="db-calender">
                        <Calendar/>
                       
                    
                </div>
                </div>
                {/* <p> <b>Plant Categories Distribution</b></p> */}
                <h2 className='hisoh22'>Plants By Categrory</h2>
                <div className='db-middlepart2'>
                     
                <div className='pie-chart-container'>
                
                   <PieChart/>
                   <div className='histogram-container'>
                   <Histogram/>
                   </div>
                   
                   </div>
                </div>
                  


                
            </div>

        </div>
      
    </div>
  )
}

export default AdminDashboard
