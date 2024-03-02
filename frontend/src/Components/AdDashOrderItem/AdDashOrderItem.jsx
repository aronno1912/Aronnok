import React, { useEffect, useState } from 'react'
import './AdDashOrderItem.css'

const AdDashOrderItem = (prod) => {
    const [user, setUser] = useState({});
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/user/${prod.userId}`);
                const data = await response.json();
                setUser(data);
            } catch (error) {
              console.error('Error fetching product data:', error);
            }
          };

          fetchUser();
        //   const intervalId = setInterval(() => {
    
        //   }, 5000);
      
        //   return () => clearInterval(intervalId);
       
      }, []);

    return (
        <div>
            <div className="dashorder-container">
                <div className="dashorder-id">
                    <p>{prod.id}</p>
                </div>
                <div className="dashorder-user">
                    <img src={"/us.png"} alt="" />
                    <div className="dashorder-id">
                        <p>{user.username}</p>
                    </div>
                </div>
                <div className="dashorder-id">
                    <p>{Math.round(prod.amount)}</p>
                </div>
                <div className="dashorder-id">
                    <p style={{color:"rgb(205, 9, 173)"}}>{prod.status}</p>
                </div>
            </div>   
        </div>
      )
}

export default AdDashOrderItem
