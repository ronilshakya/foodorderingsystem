import React from 'react';
import axios from 'axios';

const useAddProfilePic = () => {
    const addProfilePic = async (id, image) => {
        try {
            const formData = new FormData();
            formData.append('image', image);

            const response = await axios.put(`https://foodorderingsystem-pjzg.onrender.com/api/auth/adduserimage/${id}`, formData);

            if (response.status === 200) {
                console.log('Profile picture added successfully');
            }
        } catch (error) {
            console.error('Error adding profile picture:', error);
        }
    }

    return { addProfilePic }; 
}

export default useAddProfilePic;
