// // WishlistPlantsList.jsx

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './WishlistPlantsList.css';

// const WishlistPlantsList = ({ userId }) => {
//   const [wishlistPlants, setWishlistPlants] = useState([]);

//   useEffect(() => {
//     const fetchWishlistPlants = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/api/wishlist/${userId}`);
//         setWishlistPlants(response.data);
//       } catch (error) {
//         console.error('Error fetching wishlist plants:', error);
//       }
//     };

//     fetchWishlistPlants();
//   }, [userId]);

//   return (
//     <div className="wishlist-plants-list">
//       {wishlistPlants.map((plant) => (
//         <div key={plant._id} className="wishlist-plant-item">
//           <img className="wishlist-plant-photo" src={plant.photo} alt={plant.name} />
//           <div className="wishlist-plant-details">
//             <h3 className="wishlist-plant-name">{plant.name}</h3>
//             <p className="wishlist-plant-price">${plant.price}</p>
//             <p className="wishlist-plant-description">{plant.description}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default WishlistPlantsList;

// WishlistPlantsList.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './WishlistPlantsList.css';

const WishlistPlantsList = ({ userId }) => {
  const [wishlistPlants, setWishlistPlants] = useState([]);

  useEffect(() => {
    const fetchWishlistPlants = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/wishlist/${userId}`);
        setWishlistPlants(response.data);
        console.log('wishlistPlants:', wishlistPlants);
      } catch (error) {
        console.error('Error fetching wishlist plants:', error);
      }
    };

    fetchWishlistPlants();
  }, [userId]);

  return (
    <div className="wishlist-plants-list">
      {Array.isArray(wishlistPlants) && wishlistPlants.length > 0 ? (
        wishlistPlants.map((plant) => (
          <div key={plant._id} className="wishlist-plant-item">
            <img className="wishlist-plant-photo" src={plant.productPhoto} alt={plant.name} />
            <div className="wishlist-plant-details">
              <h3 className="wishlist-plant-name">{plant.productName}</h3>
              <p className="wishlist-plant-price">${plant.productPrice}</p>
              {/* <p className="wishlist-plant-description"></p> */}
            </div>
          </div>
        ))
      ) : (
        <p>No plants in the wishlist</p>
      )}
    </div>
  );
};

export default WishlistPlantsList;

