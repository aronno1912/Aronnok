import React, { useEffect, useState } from 'react'

const NotificationComp = (prod) => {
    const [isAction,setAction]=useState(false);

    useEffect(() => {
        const fetchData = () => {
          if(prod.type==="order"){
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
    <div>
      <div className="noticomp-container">
        <div className="noticomp-left">
            <p>{prod.message}</p>
        </div>
        {isAction && (
            <div className="noticomp-right">
                <button onClick={placePay}>Go to pay</button>
            </div>
        )}
        
      </div>
    </div>
  )
}

export default NotificationComp
