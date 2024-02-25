import React from 'react'
import './SearchItem'

const SearchItem = (prod) => {
  return (
    <div>
      <div className="searchitem-whole">
            <img src={prod.photo} alt="" />
            <div className="bestseller-name-quantity">
                <p>{prod.name}</p>
            </div>
        </div>
    </div>
  )
}

export default SearchItem
