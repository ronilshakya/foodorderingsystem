import React,{useState} from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

const useUpdateFoodItem = () => {
    const [updatedFood, setUpdatedFood] = useState()

    const updateFood = async(id, values) =>{
        try{
            const response = await axios.put(`http://localhost:8000/food/updatefood/${id}`,values);
            if(response.status === 200){
                setUpdatedFood(response.data)
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${response.data.message}`,
                    showConfirmButton: false,
                    timer: 1000
                })
            }
        }catch(error){
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: `${error}`,
                showConfirmButton: false,
                timer: 1000
            })
        }
    }
  return {updateFood,updatedFood};
}

export default useUpdateFoodItem