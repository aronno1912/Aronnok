import React from 'react'
import Trending from '../Components/Trending/Trending';
import Cover from '../Components/Cover/Cover';
import Footer from  '../Components/Footer/Footer';
import AdminProductPanel from '../Components/AdminProductPanel/AdminProductPanel';
import AdminNavbar from '../Components/AdminNavbar/AdminNavbar';
import Sidebar from '../Components/Sidebar/Sidebar';
import AdminNewProductAdd from '../Components/AdminNewProductAdd/AdminNewProductAdd';

const AdminAddProductPage = () => {
  return (
    <div>
     
      <AdminNavbar/>
      <Sidebar/>
      {/* <AdminProductPanel catagory="" /> */}
      <AdminNewProductAdd/>
      <Footer/>
    </div>
  )
}

export default AdminAddProductPage
