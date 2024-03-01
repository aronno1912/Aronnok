import React from 'react'
import './SearchItem.css'
import { Link } from 'react-router-dom'

const SearchItem = (prod) => {
  return (
    <div>
      <Link to={`/product/${prod.userId}/${prod.id}`}className='container-link' style={{ textDecoration: 'none', color: 'black' }}>
      <div className="searchitem-whole">
            <img src={prod.photo} alt="" />
            <div className="bestseller-name-quantity">
                <p>{prod.name}</p>
            </div>
        </div>
      </Link>
    </div>
  )
}

export default SearchItem
