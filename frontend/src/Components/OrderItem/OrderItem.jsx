import React, { useEffect, useState } from 'react'
import "./OrderItem.css"
import RatingPopUp from '../RatingPopUp/RatingPopUp';
const OrderItem = (prod) => {

    const [product, setProduct] = useState([]);
    const [isPopupVisible, setPopupVisible] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/product/659c027001b07da1b7fef185/${prod.id}`);
                const data = await response.json();
                setProduct(data);
            } catch (error) {
              console.error('Error fetching product data:', error);
            }
          };
    
         fetchProduct();
      }, []);
     
        const giveRating = async () => {
            // try {
            //     const response = await fetch(`http://localhost:8000/api/product/rating/${prod.id}`, {
            //         method: 'PUT',
            //         headers: {
            //             'Content-Type': 'application/json',
            //             'Authorization': `Bearer ${localStorage.getItem('token')}`
            //         },
            //         body: JSON.stringify({
            //             rating: 5
            //         })
            //     });
            //     const data = await response.json();
            //     console.log(data);
            // } catch (error) {
            //     console.error('Error giving rating:', error);
            // }

            //a pop up to give rating
            setPopupVisible(true);
            //console.log("status",status);

        }
        const closePopup = () => {
            setPopupVisible(false);
          };


  return (
    <div>
    <div className="order-item-container">
        <div className="order-item-left">
            <img src={product.photo} alt="" />
            <div className="orderitem-name-quantity">
                <p style={{fontSize:'17px', color:'rgb(2, 75, 33)'}}>{product.name}</p>
                <div className="orderitem-quantity">
                    <p style={{marginTop:"1px"}}>quantity: {prod.quantity}</p>
                </div>
            </div>
        </div>
        <div className="order-item-right">
            <p><b>${Math.round(prod.quantity*product.price)}</b></p>
            
            {prod.status==="Delivered" && <button className="order-item-rating-button" onClick={giveRating}>Rate</button>}
           
        </div>

 
      </div>
      {isPopupVisible && (
      <RatingPopUp
          productId={product._id}
          closePopup={closePopup}
        />
        
      )}
    </div>
  )
}

export default OrderItem
