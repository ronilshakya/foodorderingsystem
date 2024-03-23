import React,{useState} from 'react';
import Input from '../../template/Input';
import Button from '../../template/Button';
import axios from 'axios';
import useAddFoodItems from '../../../hooks/useAddFoodItems';

const AddFoodItems = () => {
    const {newFood,setNewFood,handleInputChange,handleSubmit} = useAddFoodItems();
    return (
      <div className='page-template'>
          <h1>Add Food Item</h1>
          <form onSubmit={handleSubmit} encType='multipart/form-data' className='flex flex-col gap-4 justify-center'>
              <Input label="Food Name" type="text" onChange={handleInputChange} value={newFood.name} name="name"/>
              <Input label="Food Price" type="number" onChange={handleInputChange} value={newFood.price} name="price"/>
              <Input label="Food Category" type="text" onChange={handleInputChange} value={newFood.category} name="category"/>
              <Input label="Food Image" accept=".png, .jpg, .jpeg" type="file" onChange={handleInputChange} name="image"/>
              <Button width={{ width: '30rem' }}>Submit</Button>
          </form>
      </div>
    )
}

export default AddFoodItems