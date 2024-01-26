// import React, { useEffect, useState } from 'react'
// import './FavouriteItem.css'
// // import all_plants from '../Assets/all_products'
// import Product from '../Product/Product'
// import axios from 'axios';


// const FavouriteItem = ({catagory}) => {
//   const [all_plants, setProducts] = useState([]);
    
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://localhost:8000/api/favourites/659c027001b07da1b7fef185');
//         const data = await response.json();
//         setProducts(data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
  
//     fetchData();
//   }, []);

//   return (
//     <div className='FavouriteItem'>
//       <h1>{catagory}</h1>
    
//       <div className= 'fr-products'>
//         {all_plants.map((item,i)=>{
//              return <Product label='product'key={i} id={item._id} name={item.name} description={item.description} photo={item.photo} rating={item.rating} price={item.price}/>
//         })}
//       </div>
//     </div>
//   )
// }

// export default FavouriteItem

import React, { useEffect, useState } from 'react';
import './FavouriteItem.css';
import Product from '../Product/Product';
import axios from 'axios';

const FavouriteItem = () => {
  const userId = "659c027001b07da1b7fef185"; // Hardcoded user ID for demonstration
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user's favorite plant IDs first
        const response = await axios.get(`http://localhost:8000/api/favourites/${userId}`);
        const { product } = response.data;
    
        // Fetch products based on the list of favorite IDs
        if (product && product.length > 0) {
          const productResponse = await axios.post(`http://localhost:8000/api/favourites`, { favoriteIds: product });
          setFavoriteProducts(productResponse.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    

    fetchData();
  }, [userId]);

  return (
    <div className='FavouriteItem'>
      <h1>Favorites</h1>
      <div className='fr-products'>
        {favoriteProducts.map((item, i) => (
          <Product key={i} id={item._id} name={item.name} description={item.description} photo={item.photo} rating={item.rating} price={item.price} />
        ))}
      </div>
    </div>
  );
};

export default FavouriteItem;


