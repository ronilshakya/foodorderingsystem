import React,{useState, useEffect} from 'react'
import axios from 'axios'

const useGetAllFoodItems = () => {
    const [foods, setFoods] = useState([]);
    const getAllFoods = async () =>{
        try {
          const response = await axios.get('https://foodorderingsystem-pjzg.onrender.com/food/getfoods');
          if(response.status === 200){
            setFoods(response.data)
          }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
      getAllFoods();
    }, []);
    return {foods,getAllFoods};
}

export default useGetAllFoodItems