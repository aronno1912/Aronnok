import React from 'react'
import './Trending.css'
import all_plants from '../Assets/all_products'
import Product from '../Product/Product'

const Trending = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className='trending'>
      <h1> Trending</h1>
      <div className= 'tr-products'>
        {all_plants.map((item,i)=>{
            return <Product key={i} id={item._id} name={item.name} description={item.description} photo={item.photo} rating={item.rating} price={item.price}/>
        })}
      </div>
    </div>
  )
}

export default Trending
