import React, {useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const useAddFoodItems = () => {
    const [newFood , setNewFood ] = useState({
        name: '',
        price:'',
        category:'',
        image:''
    })
    const handleSubmit = (e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', newFood.name);
        formData.append('price', newFood.price);
        formData.append('category', newFood.category);
        formData.append('image', newFood.image);

        axios.post('http://localhost:8000/food/add', formData)
            .then(res => Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${res.data}`,
                showConfirmButton: false,
                timer: 1000
            }))
            .catch(err =>  Swal.fire({
                position: "top-end",
                icon: "error",
                title: `${err}`,
                showConfirmButton: false,
                timer: 1000
            }))
    }
    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        // If it's a file input, use files[0], otherwise use value
        const newValue = e.target.type === 'file' ? files[0] : value;
        setNewFood(prevState => ({
            ...prevState,
            [name]: newValue
        }));
    };
  return {newFood,setNewFood,handleInputChange,handleSubmit}
}

export default useAddFoodItems