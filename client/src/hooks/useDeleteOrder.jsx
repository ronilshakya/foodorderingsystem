import axios from 'axios'
import Swal from 'sweetalert2'

const useDeleteOrder = () => {
    const deleteOrder = async (id) =>{
        const response = await axios.delete(`https://foodorderingsystem-pjzg.onrender.com/order/deleteorder/${id}`);
        if(response.status === 200){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${response.data.message}`,
                showConfirmButton: false,
                timer: 1000
            });
        }else{
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: `${response.data.message}`,
                showConfirmButton: false,
                timer: 1000
            });
        }
    }
  return {deleteOrder}
}

export default useDeleteOrder