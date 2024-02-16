import React from 'react'
import './BestSellerItem.css'

const BestSellerItem = (prod) => {
  return (
    <div>
        <div className="bestseller-container">
        <div className="bestseller-left">
            <img src={prod.photo} alt="" />
            <div className="bestseller-name-quantity">
                <p style={{fontSize:'17px', color:'rgb(2, 75, 33)'}}>{prod.name}</p>
                {/* <div className="orderitem-quantity">
                    <p style={{marginTop:"1px"}}>quantity: {prod.quantity}</p>
                </div> */}
            </div>
        </div>
        <div className="bestseller-right">
            <p><b>${prod.price}</b></p>
            <p style={{color:"rgb(122, 122, 123)" , marginTop:"-12px", marginRight:"10px" }}><b>sales: {prod.sold}</b></p>
        </div>
        </div>   
    </div>
  )
}

export default BestSellerItem
