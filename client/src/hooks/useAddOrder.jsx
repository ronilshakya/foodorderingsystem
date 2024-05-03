import React from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const useAddOrder = () => {
  const navigate = useNavigate()
    const addOrder = async (obj) =>{
        const response = await axios.post('http://localhost:8000/order/addorder',obj);
        if(response.status === 400){
          Swal.fire({
            position: "top",
            icon: "error",
            title: `Order Error`,
            showConfirmButton: true
        })
          console.log("Failed to add order")
        }else{
          Swal.fire({
            position: "top",
            icon: "success",
            title: `Order Placed Successfully`,
            showConfirmButton: true
        }).then(()=>
            navigate('/')
        )
          console.log("Successfull order placed")
        }
    }
  return {addOrder}
}

export default useAddOrder