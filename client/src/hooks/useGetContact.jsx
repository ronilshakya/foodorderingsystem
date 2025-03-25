import React,{useState} from 'react'
import axios from 'axios'

const useGetContact = () => {
    const [contactUsInquiries, setContactUsInquiries] = useState([])
    const getContacts = async () =>{
        try {
            const response = await axios.get('https://foodorderingsystem-pjzg.onrender.com/contact/getallcontacts');
            if(response.status === 200){
                setContactUsInquiries(response.data)
            }else{
                console.log(response.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

  return {getContacts, contactUsInquiries}
}

export default useGetContact