import React, { useEffect, useState } from 'react'
import '../Context/AdminDashboard.css'
import AdminNavbar from '../Components/AdminNavbar/AdminNavbar'
import Sidebar from '../Components/Sidebar/Sidebar'
import Footer from '../Components/Footer/Footer'
import LineChart from '../Components/LineChart/LineChart';
import { useParams } from 'react-router-dom'
import BestSellerItem from '../Components/BestSellerItem/BestSellerItem'
import Calendar from '../Components/Calender/Calender'

const AdminDashboard = () => {
    
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/trending`);
                const data = await response.json();
                setProducts(data);
            } catch (error) {
              console.error('Error fetching product data:', error);
            }
          };

        //    const intervalId = setInterval(() => {
        //     fetchProduct();
        //   }, 3000);
      
        //   return () => clearInterval(intervalId);
        fetchProduct();
         
      }, []);

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
                    <div className="db-totalsale">
                        <div className="db-graphIcon">
                            <i class="bi bi-bar-chart-fill" style={{fontSize:'35px' , color:'rgb(67, 80, 198)', marginLeft:'10px', marginTop:'20px'}}></i>
                        </div>
                        
                        <div className="db-tatalsale-text">
                            <p><b>Total Users</b></p>
                            <p style={{marginTop:'1px'}}><b>10</b></p>
                        </div>
                        
                    </div>
                    <div className="db-totalsale">
                        <div className="db-graphIcon">
                            <i class="bi bi-currency-dollar" style={{fontSize:'35px' , color:'rgb(67, 80, 198)', marginLeft:'13px', marginTop:'30px'}}></i>
                        </div>
                        
                        <div className="db-tatalsale-text">
                            <p><b>Current month Sale</b></p>
                            <p style={{marginTop:'1px'}}><b>$1500.50</b></p>
                        </div>
                    </div>
                    <div className="db-totalsale">
                        <div className="db-graphIcon">
                            <i class="bi bi-bar-chart-fill" style={{fontSize:'35px' , color:'rgb(67, 80, 198)', marginLeft:'13px', marginTop:'30px'}}></i>
                        </div>
                        
                        <div className="db-tatalsale-text">
                            <p><b>Current month Sale</b></p>
                            <p style={{marginTop:'1px'}}><b>$1500.50</b></p>
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

                    </div>
                    <div className="db-calender">
                        <Calendar/>
                    </div>
                </div>
                
            </div>

        </div>
      
    </div>
  )
}

export default AdminDashboard
