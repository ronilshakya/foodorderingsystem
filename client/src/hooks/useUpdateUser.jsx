import axios from 'axios'
import React, {useState} from 'react'
import Swal from 'sweetalert2';

const useUpdateUser = () => {
    const [updatedUser, setUpdatedUser] = useState('');
    const updateUser = async (id, username) =>{
        try{
            const response = await axios.put(`https://foodorderingsystem-pjzg.onrender.com/api/auth/updateuser/${id}`,username);
            if(response.data){
                setUpdatedUser(response.data)
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Updated Successfully",
                    showConfirmButton: false,
                    timer: 1000
                });
            }
        }catch(error){
            console.log("Error",error);
        }
    }
  return {updateUser, updatedUser }
}

export default useUpdateUser