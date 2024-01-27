import React from 'react'
import Trending from '../Components/Trending/Trending';
import Cover from '../Components/Cover/Cover';
import Footer from  '../Components/Footer/Footer';
import AdminProductPanel from '../Components/AdminProductPanel/AdminProductPanel';
import AdminNavbar from '../Components/AdminNavbar/AdminNavbar';

const AdminAllProductPage = () => {
  return (
    <div>
     
      <AdminNavbar/>
      <AdminProductPanel catagory="" />
      <Footer/>
    </div>
  )
}

export default AdminAllProductPage
