import React from 'react'
import Sidebar from '../Components/Sidebar/Sidebar'
import Navbar from '../Components/Navbar/Navbar'
import Table from '../Components/Table/Table'
import  { useEffect, useState } from 'react';
import AdminNavbar from '../Components/AdminNavbar/AdminNavbar';
import '../Context/OrderListAdmin.css';

// const OrderlistAdmin = () => {
//   return (
//     <div>
       
//       <Sidebar/>
//       <Table/>
//     </div>
//   )
// }

// export default OrderlistAdmin

const OrderlistAdmin = () => {
    const [orderHistory, setOrderHistory] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:8000/api/order/all');
          const data = await response.json();
          setOrderHistory(data);
        } catch (error) {
          console.error('Error fetching order history:', error);
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <div>
        {/* <h1>Order History</h1> */}
        <AdminNavbar/>
        <div className="orderlist-admin">
          <Sidebar />
          <div className="orderlist-table-admin">
            <Table data={orderHistory} />
          </div>
          
        </div>
        
        
      </div>
    );
  };
  
  export default OrderlistAdmin;