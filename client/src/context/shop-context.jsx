import React, { createContext, useState } from 'react'
import { FoodProductsData } from '../components/pages/order/FoodProductsData';

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for(let i = 1; i < FoodProductsData.length + 1; i++){
        cart[i] = 0;
    }
    return cart;
}

export const ShopContextProvider = (props) => {
    const [cartItems , setCartItems] = useState(getDefaultCart());

    const getTotalAmount = () =>{
        let totalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo = FoodProductsData.find((product)=>product.id===Number(item));
                totalAmount += cartItems[item] * itemInfo.price; 
            }
        }
        return totalAmount;
    }

    const addToCart = (itemId) =>{
        setCartItems((prev)=>({...prev, [itemId]: prev[itemId] + 1}));
    }
    const removeFromCart = (itemId) =>{
        setCartItems((prev)=>({...prev, [itemId]: prev[itemId] - 1}));
    }
    const contextValue = {cartItems,addToCart,removeFromCart,getTotalAmount};
  return (
    <ShopContext.Provider value={contextValue}>
        {props.children}
    </ShopContext.Provider>
  )
}
