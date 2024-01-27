import React, { createContext, useEffect, useMemo, useState } from 'react'
// import all_plants from "../Components/Assets/all_products"
export const CartContext= createContext(null);

const getDefaultCart=(all_plants)=>{
    let cart = new Map();
    let price = new Map();
   
      all_plants.map((plant) => {
            const itemId = plant._id;
            cart.set(itemId, 1);
            price.set(itemId, Number(plant.price));
      });
      
    return {cart,price};
}


const CartContextProvider = (props) => {

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
    }, []);


    const {cart,price}=getDefaultCart(all_plants);

    const [cartItems, setCartItems] = useState(cart);
    const [cartTotalPrice, setCartTotalPrice] = useState(price);

  // console.log(cartItems);
    useEffect(() => {
      let hasNaNValue = Array.from(cartItems.values()).some((value) => isNaN(value));
      if(hasNaNValue)
        setCartItems(cart);
    }, [cart]);

     useEffect(() => {
      const hasNaNValue = Array.from(cartTotalPrice.values()).some((value) => isNaN(value));
      if(hasNaNValue)
        setCartTotalPrice(price);
    }, [price]);

    //  console.log(cartItems);

    const addToCart=(itemId)=>{
      //  setCartItems((prev) => new Map([...prev, [itemId, prev.get(itemId) + 1]]));
      setCartItems((prev) => {
        const updated = new Map(prev);
        updated.set(itemId, updated.get(itemId) + 1);
        return updated;
      });
      //  setCartTotalPrice((prev) => new Map([...prev, [itemId, prev.get(itemId) + all_plants.find((plant) => plant._id === itemId)]]));
      setCartTotalPrice((prev) => {
        const updated = new Map([...prev]);
        const plant=all_plants.find((plant) => plant._id === itemId);
        const price=0;
        updated.set(itemId, updated.get(itemId) + price);
        console.log(updated.get(itemId));
        return updated;
      });
  }
    const removeFromCart=(itemId)=>{
      setCartItems((prev) => {
        const updated = new Map(prev);
        updated.set(itemId, updated.get(itemId) - 1);
        return updated;
      });
      
      setCartTotalPrice((prev) => {
        const updated = new Map([...prev]);
        const plant=all_plants.find((plant) => plant._id === itemId);
        const price=0;
        updated.set(itemId, updated.get(itemId) - price);
        console.log(updated.get(itemId));
        return updated;
      });
        // setCartItems((prev) => new Map([...prev, [itemId, prev.get(itemId) - 1]]));
        // setCartTotalPrice((prev) => new Map([...prev, [itemId, prev.get(itemId) - all_plants.find((plant) => plant._id === itemId)]]));
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

    const contextValue={all_plants,cartItems,cartTotalPrice, addToCart, removeFromCart,getTotalCartPrice,getTotalCartQuantity};
    
  return (
    <CartContext.Provider value={contextValue}>
        {props.children}
    </CartContext.Provider>
  )
}

export default CartContextProvider

// ()=>{const updated = new Map(cart);
//   cart.forEach((key,value) => {
//     updated.set(key,value);
//   });
//   return updated;
// }