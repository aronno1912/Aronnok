import React, { useEffect, useState } from 'react'
import './NotificationComp.css'
import { Link } from 'react-router-dom';
import axios from 'axios';

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

    
      const onClose = async () => {
        try {
          await axios.delete(`http://localhost:8000/api/${prod.userId}/notification/delete/${prod.id}`, {});
          // /:userId/notification/delete/:notificationId
        } catch (error) {
          console.error('Error bidding', error);
        }
      };
    const placePay = async () => {
       
       
      };
    
  return (
      <div className="noticomp-container">
        <span className="popupu-close-btn" onClick={onClose}>&times;</span>
        <div className="noticomp-body">
          <div className="noticomp-left">
              <p>{prod.message}</p>
          </div>
          {isAction && (
              <div className="noticomp-right">
                  <Link to={`/auction/payProducts/${prod.userId}/${prod.auctionId}`}><button>Pay now</button></Link>
              </div>
          )}
        </div>
        
      </div>
  )
}

export default NotificationComp
