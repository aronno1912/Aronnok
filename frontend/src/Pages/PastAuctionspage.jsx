import React from 'react'
import AdminNavbar from '../Components/AdminNavbar/AdminNavbar'
import Sidebar from '../Components/Sidebar/Sidebar'
import AdAuctionProductList from '../Components/AdAuctionProductList/AdAuctionProductList'
import Footer from '../Components/Footer/Footer'
import { useParams } from 'react-router-dom'

const PastAuctionsPage = () => {
    const {catagory}=useParams();
    const {auctionId}=useParams();
    

    const listAllStyle = {
    //    marginLeft: '250px',
    display: 'flex', // Add other styles as needed
    justifyContent: 'center', // Center the content horizontally
    alignItems: 'center',
        marginTop: '70px',
      };
  return (
    <div>
        <AdminNavbar/>
        <Sidebar/>
        <div classname="listall" style={listAllStyle}>
        <AdAuctionProductList auctionId={auctionId} catagory={catagory} />
        </div>
        <Footer/>
      
    </div>
  )
}

export default PastAuctionsPage