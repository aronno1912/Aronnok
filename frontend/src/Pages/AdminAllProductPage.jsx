import React from 'react'
import Trending from '../Components/Trending/Trending';
import Cover from '../Components/Cover/Cover';
import Footer from  '../Components/Footer/Footer';
import '../Context/AdminAllProductPage.css';
import AdminProductPanel from '../Components/AdminProductPanel/AdminProductPanel';
import AdminNavbar from '../Components/AdminNavbar/AdminNavbar';
import Sidebar from '../Components/Sidebar/Sidebar';
import AdminNewProductAdd from '../Components/AdminNewProductAdd/AdminNewProductAdd';

const AdminAllProductPage = () => {
  return (
    <div>
     
      <AdminNavbar/>
      <div className="adminallproduct-body">
        <Sidebar/>
        <AdminProductPanel catagory=""/>
      </div>
      
      <Footer/>
    </div>
  )
}

export default AdminAllProductPage
