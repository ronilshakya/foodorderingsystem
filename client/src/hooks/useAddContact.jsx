import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'

const useAddContact = () => {
    const addContact = async (obj) => {
        try {
            const response = await axios.post('http://localhost:8000/contact/addcontact', obj);
            if (response.status === 200) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Contact added successfully`,
                    showConfirmButton: false,
                    timer: 1000
                })
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: `Something went wrong`,
                    showConfirmButton: false,
                    timer: 1000
                })
            }
        } catch (error) {
            console.log(error);
        }
    };

    return { addContact };
};

export default useAddContact;
