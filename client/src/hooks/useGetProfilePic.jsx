import axios from 'axios'
import React,{useState} from 'react'

const useGetProfilePic = () => {
    const [userImage, setUserImage] = useState('')
    const getProfilePic = async (id) =>{
        try {
            const response = await axios.get(`http://localhost:8000/api/auth/getuserimage/${id}`);
            if(response.status === 400){
                console.log(response.data)
            }else{
                setUserImage(response.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
  return {userImage,getProfilePic}
}

export default useGetProfilePic