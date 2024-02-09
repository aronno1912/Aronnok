import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import NotificationComp from '../NotificationComp/NotificationComp';

const UserNotification = ({userId,onClose}) => {

    const [notis, setNotis] = useState([]);

    useEffect(() => {
        const fetchNotification = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/notification/${userId}`);
                const data = await response.json();
                setNotis(data.messages);
            } catch (error) {
              console.error('Error fetching product data:', error);
            }
          };
    
         
         const intervalId = setInterval(() => {
            fetchNotification();
        }, 7000);
    
    
        // Clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    
      }, []);
  return (
    <div>
        <div className="unot-container">
        <div className="unot-content">
            <span className="unot-close-btn" onClick={onClose}>&times;</span>
            <div className= 'all-notifications'>
                {notis.map((item,i)=>{
                    return <NotificationComp id={item._id} userId={userId} message={item.message} type={item.type} link={item.link} read={item.read} />
                })}
            </div>
      </div>
      </div>
    </div>
  )
}

export default UserNotification
