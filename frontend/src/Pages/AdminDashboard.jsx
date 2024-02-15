import React from 'react'
import '../Context/AdminDashboard.css'
import AdminNavbar from '../Components/AdminNavbar/AdminNavbar'
import Sidebar from '../Components/Sidebar/Sidebar'
import Footer from '../Components/Footer/Footer'
import LineChart from '../Components/LineChart/LineChart';

const AdminDashboard = () => {
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

                {/* <div className="db-graph">
                    <LineChart/>
                </div> */}
            </div>

        </div>
      
      <Footer/>
    </div>
  )
}

export default AdminDashboard
