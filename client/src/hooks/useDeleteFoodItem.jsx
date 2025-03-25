import axios from 'axios'
import React from 'react'
import Swal from 'sweetalert2'

const useDeleteFoodItem = () => {
    const deleteFoodItem = async(id) =>{
        const response = await axios.delete(`https://foodorderingsystem-pjzg.onrender.com/food/deletefood/${id}`);
        if(response.status === 200){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${response.data.message}`,
                showConfirmButton: false,
                timer: 1000
            })
        }else{
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: `${response.data.message}`,
                showConfirmButton: false,
                timer: 1000
            })
        }
    }
  return {deleteFoodItem}
}

export default useDeleteFoodItem