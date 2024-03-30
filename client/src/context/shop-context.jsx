import React, { createContext, useState, useEffect } from 'react';
import useGetAllFoodItems from '../hooks/useGetAllFoodItems';

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
    const { foods } = useGetAllFoodItems();
    const [cartItems, setCartItems] = useState(() => {
        let cart = {};
        if (foods) { // Ensure foods are fetched before initializing cart
            for (let food of foods) {
                cart[food._id] = 0;
            }
        }
        return cart;
    });
    
    useEffect(() => {
        if (foods) { // Ensure foods are fetched before initializing cart
            let updatedCart = {};
            for (let food of foods) {
                updatedCart[food._id] = 0;
            }
            setCartItems(updatedCart);
        }
    }, [foods]);

    const getTotalAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = foods.find((product) => product._id === item);
                totalAmount += cartItems[item] * itemInfo.price;
            }
        }
        return totalAmount;
    }

    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    }

    const contextValue = { cartItems, addToCart, removeFromCart, getTotalAmount };

    if (!foods) {
        return <div>Loading...</div>; // Placeholder for loading indicator
    }
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}
