import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import AuctionWinitem from '../Components/AuctionWinitem/AuctionWinitem';
import '../Context/AuctionWinProducts.css'


const AuctionWinProducts = () => {
    const {userId,auctionId}=useParams();
    const [products,setProducts]=useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                console.log("hellloooooooo");
                const response = await fetch(`http://localhost:8000/api/auction/highestBidder/${auctionId}/${userId}`);
                const data = await response.json();
                setProducts(data);
                
            } catch (error) {
              console.error('Error fetching product data:', error);
            }
          };
    
    
         const intervalId = setInterval(() => {      
          fetchProducts();
        }, 7000);
    
    
        // Clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    
      }, []);
    
  return (
    <div style={{width:'100%'}}>
    <Navbar userId={userId}/>
    
        <div className="winitems-title">
            <p style={{fontSize:'25px' , color:"rgb(141, 16, 187)"}}><b> You have won {products.length} products!</b></p>
            {/* <hr style={{width:"150px", margin:"0", border:"2px solid", borderRadius:"10px"}}/> */}
        </div>
        <div className="winitems-header">
            <div className="winitems-header-p">
                <p><b>Products</b></p>
                <p><b>Price</b></p>
            </div>
            <hr style={{position: "absolute", top:"40px", width:"700px"}}/>
        </div>
        <div className="winitems-orderitems">
        {products.map((item,i)=>{
        return <AuctionWinitem key={i} id={item._id} auctionId={auctionId} userId={userId} name={item.name} price={item.currentBid} photo={item.photo}/>
        })}
        </div>
    <Footer/>
    </div>
  )
}

export default AuctionWinProducts
