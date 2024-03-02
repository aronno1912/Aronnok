import React, { useEffect, useState } from 'react'
import AdminUserSmall from '../Components/AdminUserSmall/AdminUserSmall';
import AdminNavbar from '../Components/AdminNavbar/AdminNavbar';
import axios from 'axios';
import Sidebar from '../Components/Sidebar/Sidebar';
import '../Context/AllUsers.css'

const AllUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchAuctionProducts = async () => {
          try {
            const response = await axios.get(`http://localhost:8000/api/getAllUser`);
            setUsers(response.data);
          } catch (error) {
            console.error('Error fetching auction products:', error);
          }
        };
    
            fetchAuctionProducts();
        }, []);
    
  return (
    <div>
        <AdminNavbar/>
        <div className="allusers-body">
            <Sidebar/>

            <div className="allusers-mainbody">
                <div className="allusers-allitems">
                    {users.filter(item => item.role !== 1).map((item,i)=>{
                    return <AdminUserSmall id={item._id} firstname={item.firstname} lastname={item.lastname} username={item.username} photo={"/userP2.jpg"}/>
                    })}
                </div>
            </div>

        </div>
    </div>
  )
}

export default AllUsers
