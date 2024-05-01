import React,{useState} from 'react'
import axios from 'axios'

const useGetCarouselImage = () => {
    const [getCarouselImages , setGetCarouselImage] = useState([]);
    const [loading, setLoading] = useState(true);

    const getCarouselImagefunction = async () =>{
        try {
            const response = await axios.get('http://localhost:8000/carousel/getcarouselimage');
            if(response.status === 201){
                setGetCarouselImage(response.data)
                setLoading(false)
            }else{
                console.log(response.data)
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
  return {getCarouselImagefunction, getCarouselImages, loading}
}

export default useGetCarouselImage