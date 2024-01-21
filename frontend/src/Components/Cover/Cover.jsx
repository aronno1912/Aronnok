import React from 'react'
import './Cover.css'
import hand_icon from '../Assets/aronnok-logo.png'
import cover_photo from '../Assets/cover.png'

const Cover = () => {
  return (
    <div className='cover'>
        <img src={cover_photo} alt="" />
        
        <div className="cover-text">
            <p>End of year<br/> Special Bids</p>
            <button>check them out</button>
        </div>
    </div>
  )
}


export default Cover
