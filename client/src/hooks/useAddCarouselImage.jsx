import React from 'react'
import axios from 'axios'

const useAddCarouselImage = () => {
    const addCarouselImage = async (formData) =>{
        try {
            const response = axios.post('http://localhost:8000/carousel/addcarouselimage', formData, {
                headers: {
                    'Content-Type':'multipart/form-data'
                }
            })
            return (await response).data;
        } catch (error) {
            console.error('Error adding carousel image:', error);
        }
    }
  return {addCarouselImage}
}

export default useAddCarouselImage