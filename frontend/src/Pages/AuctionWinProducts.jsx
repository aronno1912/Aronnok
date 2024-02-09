import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';

const AuctionWinProducts = () => {
    const [userId,auctionId]=useParams();
    const [products,setProducts]=useState();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/auction/get-auction/${auctionId}`);
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
    <div>
    <Navbar/>
    
        <div className="winitems-title">
            <p style={{fontSize:'25px', color:"rgb(17, 77, 44)"}}><b></b></p>
            <hr style={{width:"150px", margin:"0", border:"2px solid", borderRadius:"10px"}}/>
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
        return <AuctionWinProducts key={i} id={item.product} name={item.name} price={item.price} photo={item.photo}/>
        })}
        </div>
    <Footer/>
    </div>
  )
}

export default AuctionWinProducts
