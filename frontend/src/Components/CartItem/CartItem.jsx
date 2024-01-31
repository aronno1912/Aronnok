import React, { useContext, useEffect, useState } from 'react';
import './CartItem.css';
import axios from 'axios';
import { ProjectContext } from '../../Context/ProjectContext';

const CartItem = (prod) => {
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(prod.quantity);
  const [totalPrice, setPrice] = useState(0);

  const { updateTotalQuantity } = useContext(ProjectContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/product/659c027001b07da1b7fef185/${prod.id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    const fetchTotalQuantity = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/cart/getQuantity/659c027001b07da1b7fef185/${prod.id}`);
        const data = await response.json();
        setQuantity(data.quantity);
        setPrice(Math.round(data.quantity * data.price));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchProduct();
    fetchTotalQuantity();
  }, []);

  const updateCart = async (newQuantity) => {
    try {
      await axios.put(`http://localhost:8000/api/cart/update/659c027001b07da1b7fef185/${prod.id}`, { "quantity": newQuantity, "selected": true });
      console.log('product updated in cart');
    } catch (error) {
      console.error('Error updating ', error);
    }
    updateTotalQuantity();
  };

  const increment = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    setPrice(Math.round(totalPrice+ product.price));
    updateCart(newQuantity);
  };

  const decrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      setPrice(Math.round(totalPrice+ product.price));
      updateCart(newQuantity);
    }
  };

  const removeItem = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/cart/deleteItem/659c027001b07da1b7fef185/${prod.id}`, {});
      console.log('product deleted from cart');
    } catch (error) {
      console.error('Error deleting ', error);
    }
  };

  return (
    <div className="cart-item-container">
      <div className="cart-item-left">
        <img src={product.photo} alt="" />
        <div className="name-quantity">
          <p style={{ fontSize: '17px', color: 'rgb(2, 75, 33)' }}>{product.name}</p>
          <div className="item-quantity">
            <button onClick={decrement}>-</button>
            <p style={{ marginTop: "1px" }}>{quantity}</p>
            <button onClick={increment}>+</button>
          </div>
        </div>
      </div>
      <div className="cart-item-middle">
        <p>${product.price}</p>
      </div>
      <div className="cart-item-right">
        <button className='remove-btn' onClick={removeItem}><i class="bi bi-x" style={{ fontSize: '20px' }}></i></button>
        <p><b>${totalPrice}</b></p>
      </div>

    </div>
  )
}


export default CartItem
