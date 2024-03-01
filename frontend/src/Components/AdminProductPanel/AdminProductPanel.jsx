// import React, { useContext, useEffect, useState } from 'react'

// // import all_plants from '../Assets/all_products'
// import Product from '../Product/Product'
// import axios from 'axios';
// import { CartContext } from '../../Context/CartContext';
// import AdminProduct from '../AdminProduct/AdminProduct';
// import './AdminProductPanel.css'


// const AdminProductPanel = ({catagory}) => {
//   const [all_plants, setProducts] = useState([]);
 
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://localhost:8000/api/products/659c027001b07da1b7fef185');
//         const data = await response.json();
//         setProducts(data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
  
//     fetchData();
//   }, );

//   return (
//     <div className='atrending'>
//       <h1>{catagory}</h1>
    
//       <div className= 'atr-products'>
//         {all_plants.map((item,i)=>{
//              return <AdminProduct label='product'key={i} id={item._id} name={item.name} description={item.description} photo={item.photo} rating={item.rating} price={item.price} sold={item.sold} stock={item.stock}/>
//         })}
//       </div>
//     </div>
//   )
// }

// export default AdminProductPanel

// AdminProductPanel.jsx
import React, { useEffect, useState } from 'react';
import AdminProduct from '../AdminProduct/AdminProduct';
import './AdminProductPanel.css';

const AdminProductPanel = ({ catagory }) => {
  const [all_plants, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/products/659c027001b07da1b7fef185');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [catagory]);

  return (
    <div className='atrending'>
      <h1>{catagory}</h1>
      <div className='atr-products'>
        {all_plants.map((item, i) => (
          <AdminProduct
            label='product'
            key={i}
            id={item._id}
            name={item.name}
            description={item.description}
            photo={item.photo}
            rating={item.rating}
            price={item.price}
            sold={item.sold}
            stock={item.stock}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminProductPanel;
