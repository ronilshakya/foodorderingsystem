import axios from 'axios'
import { useState } from 'react'

const useGetOrderById = () => {
    const [orderById, setOrderById] = useState();
    const getOrderById = async (id) =>{
        try {
            const response = await axios.get(`http://localhost:8000/order/getorderbyid/${id}`);
            if(response.status === 200){
                setOrderById(response.data);
            }else{
                console.log(response.data)
            }
        } catch (error) {
            console.log(error.message);
        }
    }
  return {getOrderById, orderById}
}

export default useGetOrderById