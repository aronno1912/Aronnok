import React from 'react'
import Auction from '../Components/Auction/Auction'
import AdminNavbar from '../Components/AdminNavbar/AdminNavbar'
import Sidebar from '../Components/Sidebar/Sidebar'

const AdminCreateAuction = () => {
  return (
    <div>
        <AdminNavbar/>
        <Sidebar/>
      <Auction/>
    </div>
  )
}

export default AdminCreateAuction
