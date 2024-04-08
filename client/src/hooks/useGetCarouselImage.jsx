import React,{useState} from 'react'
import axios from 'axios'

const useGetCarouselImage = () => {
    const [getCarouselImages , setGetCarouselImage] = useState([])
    const getCarouselImagefunction = async () =>{
        try {
            const response = await axios.get('http://localhost:8000/carousel/getcarouselimage');
            if(response.status === 201){
                setGetCarouselImage(response.data)
            }else{
                console.log(response.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
  return {getCarouselImagefunction, getCarouselImages}
}

export default useGetCarouselImage