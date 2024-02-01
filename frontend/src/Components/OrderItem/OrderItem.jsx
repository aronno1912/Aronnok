import React, { useEffect, useState } from 'react'
import "./OrderItem.css"
const OrderItem = (prod) => {

    const [product, setProduct] = useState([]);

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
            <p><b>${prod.quantity*product.price}</b></p>
        </div>
    
   </div>
    </div>
  )
}

export default OrderItem
