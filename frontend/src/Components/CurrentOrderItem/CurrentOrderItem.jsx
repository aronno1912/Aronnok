import React, { useEffect, useState } from 'react'
import './CurrentOrderItem.css'
import { Link } from 'react-router-dom';
const CurrentOrderItem = (prod) => {
    const [products, setProducts] = useState([]);
    const [order, setOrder] = useState({});
    const [orderItems, setOrderItems] = useState([]);
    const [namelist,setNames]=useState([]);

    const fetchProduct = async (productId) => {
        try {
          // Assuming you have an API endpoint for fetching product data based on productId
          const response = await fetch(`http://localhost:8000/api/product/${prod.userId}/${productId}`);
          const data = await response.json();
          return data;
        } catch (error) {
          console.error('Error fetching product data:', error);
          return null;
        }
      };

   useEffect(() => {

        const getNames = async (items) => {
            setNames([]);
            for (const item of items) {
            const data = await fetchProduct(item.product);
            setNames((prevNames) => [...prevNames, data.name]);
            }
            console.log(orderItems);
        }

        const fetchOrder = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/order/particularOrder/${prod.id}`);
                const data = await response.json();
                setOrder(data);
                setOrderItems(data.products);

                getNames(data.products);
            } catch (error) {
              console.error('Error fetching product data:', error);
            }
          };

         fetchOrder();
      }, [prod.id]);

  return (
    <div>
        <Link to={`/orderstatus/${prod.userId}/${prod.id}`}className='container-link' style={{ textDecoration: 'none', color: 'black' }}>
       <div className="curorderitem-container">
        <div className="curorderitem-left">
            <p style={{fontSize:'18px', color:'rgb(2, 75, 33)'}}>Order ID: {order._id}</p>
            <p style={{fontSize:'12px', color:'rgb(2, 75, 33)'}}>Products: {namelist.join(', ')}</p>
            <p style={{fontSize:'12px', color:'rgb(2, 75, 33)'}}>Status: {order.status}</p>
        </div>
        <div className="curorderitem-right">
            <p><b>${order.amount}</b></p>
        </div>
        </div>
        </Link>
    </div>
  )
}

export default CurrentOrderItem
