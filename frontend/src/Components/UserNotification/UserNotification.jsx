import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const UserNotification = () => {
    const {orderId} = useParams();

    const [notis, setNotis] = useState({});

    useEffect(() => {
        const fetchNotification = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/auction/get-auction`);
                const data = await response.json();
                setNotis(data);
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
      
    </div>
  )
}

export default UserNotification
