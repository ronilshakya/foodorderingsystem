import React from 'react'
import axios from 'axios'
import { useState } from 'react'

const useGetOrder = () => {
    const [allOrders, setAllOrders] = useState();
    const getAllOrders = async () =>{
        try {
            const response = await axios.get('http://localhost:8000/order/getorder');
            if(response.status === 200){
                setAllOrders(response.data);
            }else{
                console.log("Failed to get orders")
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const [orderByUsername, setOrderByUsername] = useState();
    const getOrderByUsername = async (username) =>{
        try{
            const response = await axios.get(`http://localhost:8000/order/getorderbyusername/${username}`);
            if(response.status === 200){
                setOrderByUsername(response.data)
            }else{
                console.log("Eroor retircveing data")
            }
        }catch(error){
            console.log(error.message)
        }
    }
  return {getOrderByUsername, orderByUsername, getAllOrders, allOrders}
}

export default useGetOrder