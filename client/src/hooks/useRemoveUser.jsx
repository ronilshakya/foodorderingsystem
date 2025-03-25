import axios from "axios";
import Swal from "sweetalert2";

const useRemoveUser = (getAllUsers) => {
    const removeUser = async(id) =>{
        try{
          const response = await axios.delete(`https://foodorderingsystem-pjzg.onrender.com/api/auth/deleteuser/${id}`);
          if(response.status === 200){
            getAllUsers();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Removed Successfully",
              showConfirmButton: false,
              timer: 1000
          });
          }
        }catch(error){
          console.log(error);
        }
      }
  return {removeUser}
}

export default useRemoveUser