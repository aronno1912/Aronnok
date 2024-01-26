import React, { createContext, useEffect, useState } from 'react'
// import all_plants from "../Components/Assets/all_products"
export const CartContext= createContext(null);

const getDefaultCart=(all_plants)=>{
    let cart = new Map();
    let price = new Map();
   
      all_plants.map((plant) => {
            const itemId = plant._id;
            cart.set(itemId, 0);
            price.set(itemId, plant.price);
      });
      
    return {cart,price};
}


const CartContextProvider = (props) => {

    const [all_plants, setProducts] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:8000/api/products');
          const data = await response.json();
          setProducts(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      fetchData();
    }, []);


    const {cart,price}=getDefaultCart(all_plants);
    const [cartItems, setCartItems] = useState(cart);
    const [cartTotalPrice, setCartTotalPrice] = useState(price);

    console.log(cartItems);

    const addToCart=(itemId)=>{
       setCartItems((prev) => new Map([...prev, [itemId, prev.get(itemId) + 1]]));
       setCartTotalPrice((prev) => new Map([...prev, [itemId, prev.get(itemId) + all_plants.find((plant) => plant._id === itemId)]]));
        // console.log(cartItems.get(itemId));
    //    setCartItems((prev) => ({...prev, [itemId]: prev.get(itemId) + 1}));
    //    setCartTotalPrice((prev) => ({...prev, [itemId]: prev.get(itemId) + all_plants.find((plant) => plant._id === itemId)}));
    }

    const removeFromCart=(itemId)=>{
    //     setCartItems((prev) => ({...prev, [itemId]: prev.get(itemId) + 1}));
    //    setCartTotalPrice((prev) => ({...prev, [itemId]: prev.get(itemId) + all_plants.find((plant) => plant._id === itemId)}));
        setCartItems((prev) => new Map([...prev, [itemId, prev.get(itemId) - 1]]));
        setCartTotalPrice((prev) => new Map([...prev, [itemId, prev.get(itemId) - all_plants.find((plant) => plant._id === itemId)]]));
    }

    const getTotalCartQuantity=()=>{
        let total=0;
        for (const item of cartItems.values()) {
            total += item;
          }
        return total;
    }

    const getTotalCartPrice=()=>{
        let totalPrice=0;
        for (const price of cartTotalPrice.values()) {
            totalPrice += price;
          }
        return totalPrice;
    }

    const contextValue={cartItems,cartTotalPrice, addToCart, removeFromCart,getTotalCartPrice,getTotalCartQuantity};
    
  return (
    <CartContext.Provider value={contextValue}>
        {props.children}
    </CartContext.Provider>
  )
}

export default CartContextProvider
