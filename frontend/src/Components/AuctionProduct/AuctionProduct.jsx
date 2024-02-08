import React from 'react'
import "./AuctionProduct.css"

const AuctionProduct = () => {
    
  return (
    <div>
       <Link to={`/product/${prod.userId}/${prod.id}`}className='container-link' style={{ textDecoration: 'none', color: 'black' }}>
        <div className='product-container'> 

        <div className='container'> 
        <img src={prod.photo} alt="" style={{ width: '280px', height: '200px' }} />

        <div className="plant-details">
            <p className='plant-name'>{prod.name}</p>
            <div className="product-description">
                <p>{prod.description}</p>
            </div>
            <p className='product-price'><b>${prod.price}</b></p>
            <div className="product-footer">
            <button className="buy-btn">Bid</button>    
            </div>
            </div>
        </div>
        </div>
      </Link>
    </div>
  )
}

export default AuctionProduct
