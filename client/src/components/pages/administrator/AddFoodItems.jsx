import React from 'react';
import useAddFoodItems from '../../../hooks/useAddFoodItems';
import Input from '../../template/Input'; 
import Button from '../../template/Button'; 

const AddFoodItems = () => {
    const { newFood, handleInputChange, handleSubmit } = useAddFoodItems();

    return (
        <div className='page-template'>
            <h1 className='text-xl my-4'>Add Food Item</h1>
            <form onSubmit={handleSubmit} encType='multipart/form-data' className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div className='flex flex-col gap-4'>
                    <Input label="Food Name" type="text" onChange={handleInputChange} value={newFood.name} name="name" required />
                    <Input label="Food Price" type="number" onChange={handleInputChange} value={newFood.price} name="price" required />
                    <Input label="Food Category" type="text" onChange={handleInputChange} value={newFood.category} name="category" required />
                    <Input label="Food Image" accept=".png, .jpg, .jpeg" type="file" onChange={handleInputChange} name="image" required />
                    <Input label="Food Inventory" type="number" onChange={handleInputChange} value={newFood.inventory} name="inventory" required />
                    <div className="flex flex-col gap-1">
                        <div className='flex justify-between'>
                            <label className="form-text">Food Description:</label>
                        </div>
                        <textarea
                            name="description"
                            value={newFood.description}
                            onChange={handleInputChange}
                            className='border bg-white border-neutral-400 p-2 rounded-md text-neutral-600 focus:border-orange-400 focus:outline-none'
                            required
                        />
                    </div>
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </div>
    );
};

export default AddFoodItems;
