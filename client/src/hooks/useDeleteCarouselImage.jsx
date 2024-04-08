import React from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

const useDeleteCarouselImage = () => {
    const deleteCarouselImage = async (id) =>{
        try {
            const response = await axios.delete(`http://localhost:8000/carousel/deletecarouselimage/${id}`)
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
        } catch (error) {
            console.log(error)
        }
    }
  return {deleteCarouselImage}
}

export default useDeleteCarouselImage