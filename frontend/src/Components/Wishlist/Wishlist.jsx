import React, { useEffect, useState } from 'react'
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import './Wishlist.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import all_plants from '../Assets/all_products'


const Wishlist = ({ category, mypath, userId, wishlistPlantId }) => {
  const [all_plants, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(mypath);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data.product);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    // Fetch products periodically
    const intervalId = setInterval(fetchData, 7000);

    // Cleanup
    return () => clearInterval(intervalId);
  }, [mypath, userId]);
  const deleteFromWishlist = async (wishlistPlantId) => {
    try {
      if (category === 'Wishlist')
        await axios.delete(`http://localhost:8000/api/wishlist/${userId}/${wishlistPlantId}`, {});
      if (category === 'Favourites')
        await axios.delete(`http://localhost:8000/api/favourites/${userId}/${wishlistPlantId}`, {});
    } catch (error) {
      console.error('Error deleting', error);
    }
  };
  return (
    // <div className='wish-products'>
    <div className="wishallproduct-body">
      <div className="wishcard-grid">
        {Array.isArray(all_plants) && all_plants.map((item, i) => (
          <Card key={i} className="wishcard-sm">
            <div className="card-content">
            <Card.Img src={item.productPhoto} alt="" style={{ width: '280px', height: '200px', display: 'block', margin: 'auto' }} />
            <Card.Body style={{ paddingLeft: '10px' ,paddingBottom:'10px'}}>
              <Card.Title>{item.productName}</Card.Title>
              <Card.Text>{item.productPrice}</Card.Text>
              <Button variant="primary" onClick={() => deleteFromWishlist(item.product)}>Remove from {category}</Button>
            </Card.Body>
            </div>
          </Card>
        ))}
      </div>
    </div>
    //  </div>
  );
};

export default Wishlist;
