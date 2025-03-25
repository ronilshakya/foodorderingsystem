import React from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

const useAddOrder = () => {
    const addOrder = async (obj) =>{
        const response = await axios.post('https://foodorderingsystem-pjzg.onrender.com/order/addorder',obj);
        if(response.status === 400 || response.status === 500){
          console.log("Failed to add order")
        }else{
          console.log("Successfull order placed")
        }
    }
  return {addOrder}
}

export default useAddOrder