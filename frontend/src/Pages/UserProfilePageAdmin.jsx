import React from 'react';
import UserProfile2 from '../Components/UserProfile/UserProfile2';
import { useParams } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import AdminNavbar from '../Components/AdminNavbar/AdminNavbar';
import Sidebar from '../Components/Sidebar/Sidebar';
import CurrentOrderItem from '../Components/CurrentOrderItem/CurrentOrderItem';
import OrderList2 from './OrderList2';
import WinnedProductsList from '../Components/WinnedProductList/WinnedProductList';

const UserProfilePageAdmin = () => {
    const { userId } = useParams();
    return (
        <div>
            
            <AdminNavbar />
            <div className="admin-userprofile">
             
                <div style={{marginLeft:"300px", marginTop:"100px",marginBottom:"-100px"}}>
                    <p style={{fontSize:40}}>Personal Information</p>
                </div>
                <UserProfile2 userId={userId} />
                <div style={{marginLeft:"300px", marginTop:"100px"}}>
                    <p style={{fontSize:40}}>Orders</p>
                </div>
                <OrderList2/>

                <div style={{marginLeft:"300px", marginTop:"100px"}}>
                    <p style={{fontSize:40}}>Auction History</p>
                    <p style={{fontSize:30,color:'green'}}>Won Products</p>
                </div>
                <WinnedProductsList userId={userId}/>

                

                <Footer />
            </div>
            
            
        </div>
    );
};

export default UserProfilePageAdmin;
