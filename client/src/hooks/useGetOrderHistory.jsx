import axios from 'axios'
import React,{useState} from 'react'

const useGetOrderHistory = () => {
    const [orderHistoryObject, setOrderHistoryObject] = useState();

    const getOrderHistory = async (id) =>{
        try {
            const response = await axios.get(`http://localhost:8000/api/auth/getorderhistory/${id}`);
            if(response.status === 200){
                setOrderHistoryObject(response.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
  return {orderHistoryObject,getOrderHistory}
}

export default useGetOrderHistory