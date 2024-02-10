import React, { useEffect, useState } from 'react'
import './NotificationComp.css'
import { Link } from 'react-router-dom';

const NotificationComp = (prod) => {
    const [isAction,setAction]=useState(false);

    useEffect(() => {
        const fetchData = () => {
          if(prod.type==="auction"){
           setAction(true);
          }
          else
          setAction(false);
        };
      
        fetchData();
      }, []);

    const openPopup = () => {
        setAction(true);
      };
    
      const closePopup = () => {
        setAction(false);
      };
    const placePay = async () => {
       
       
      };
    
  return (
      <div className="noticomp-container">
        <div className="noticomp-left">
            <p>{prod.message}</p>
        </div>
        {isAction && (
            <div className="noticomp-right">
                <Link to={`/auction/payProducts/${prod.userId}/${prod.auctionId}`}><button>Pay now</button></Link>
            </div>
        )}
        
      </div>
  )
}

export default NotificationComp
