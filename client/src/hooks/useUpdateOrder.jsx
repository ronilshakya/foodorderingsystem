import React from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

const useUpdateOrder = () => {
    const updateOrder = async (orderId,obj) =>{
        try {
            const response = await axios.put(`https://foodorderingsystem-pjzg.onrender.com/order/updateorder/${orderId}`,obj);
            if(response.status === 400){
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Order update failed",
                    showConfirmButton: false,
                    timer: 1000
                })
            }else{
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${response.data.message}`,
                    showConfirmButton: false,
                    timer: 1000
                })
            }
        } catch (error) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: `${error.message}`,
                showConfirmButton: false,
                timer: 1000
            })
        }
    }
  return {updateOrder}
}

export default useUpdateOrder