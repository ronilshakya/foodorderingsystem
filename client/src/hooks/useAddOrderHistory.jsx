import axios from 'axios'
import React from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const useAddOrderHistory = () => {
    const navigate = useNavigate();
    const addOrderHistory = async (id,obj) =>{
        const response = await axios.put(`http://localhost:8000/api/auth/addorderhistory/${id}`,obj);
        if(response.status === 404){
            Swal.fire({
                position: "top",
                icon: "error",
                title: `Order Error`,
                showConfirmButton: true
            })
        }else{
            Swal.fire({
                position: "top",
                icon: "success",
                title: `Order Success`,
                showConfirmButton: true
            }).then(()=>
                navigate('/')
            )
        }
    }
  return {addOrderHistory}
}

export default useAddOrderHistory