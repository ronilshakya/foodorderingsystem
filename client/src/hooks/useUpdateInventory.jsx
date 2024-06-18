import axios from 'axios';
import Swal from 'sweetalert2';

const useUpdateInventory = () => {
    const updateInventory = async (orderObj) => {
        try {
            const response = await axios.post('http://localhost:8000/food/updateinventory', orderObj);

            if (response.status >= 400 && response.status < 600) {
                Swal.fire({
                    position: 'top',
                    icon: 'error',
                    title: `${response.data}`,
                    showConfirmButton: true
                });
                return false;
            } else {
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: `${response.data}`,
                    showConfirmButton: true
                });
                return true;
            }
        } catch (error) {
            console.error('Error updating inventory:', error);
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Error',
                text: 'Failed to receive order. Please try again later.',
                showConfirmButton: true
            });
            return false;
        }
    };

    return { updateInventory };
};

export default useUpdateInventory;
