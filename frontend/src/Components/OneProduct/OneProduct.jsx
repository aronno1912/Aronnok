
import React from 'react';
import './OneProduct.css';
import all_plants from '../Assets/all_products';
import coverImage from '../Assets/bansai.jpg'; 
import star_icon from '../Assets/star_icon.png';
import dull_star_icon from '../Assets/star_dull_icon.png';


const OneProduct = () => {
//   const { id } = useParams();

  // Find the product with the matching id
  const product = all_plants[0]

  if (!product) {
    return <p>Product not found</p>;
  }
  const isInStock = product.stock > 0;

  return (
    <div className='oneproduct'>
      <div className="oneproduct__left">
        <div className="oneproduct__left__img">
          <img className='main-img' src={product.photo} alt="Bansaiitis" />
        </div>
      </div>
      <div className="oneproduct__right">
        <h1>{product.name}</h1>
        <div className="oneproduct__right__rating">
          <img src={star_icon}alt="" />
          <img src={star_icon}alt="" />
          <img src={star_icon}alt="" />
          <img src={star_icon}alt="" />
          <img src={dull_star_icon}alt="" />
          <p>(122)</p>
          </div>

        <div className="prouctdisplay-right-prices" >
          <div className="prouctdisplay-right-prices-new">
            ${product.price}
          </div>
          <div className="productdisplay-right-description">
            {product.description}
          </div>


        </div>
        {isInStock ? (
          <p className="in-stock">In Stock</p>
        ) : (
          <p className="out-of-stock">Out of Stock</p>
        )}
        {isInStock?
        (<button className="productdisplay-right-button">Add to Cart</button>):(<button className="productdisplay-right-button2">Add to Wishlist</button>)}
        
        <button className="productdisplay-right-button3">Add to Favourites</button>
        {/* <p>Description: {product.description}</p>
        {/* Add other details as needed */}
    
      </div>
    </div>
  )
}

export default OneProduct;
