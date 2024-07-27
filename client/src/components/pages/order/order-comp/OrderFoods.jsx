import React, { useContext, useEffect, useState } from 'react';
import useGetAllFoodItems from '../../../../hooks/useGetAllFoodItems';
import Button from '../../../template/Button';
import { ShopContext } from '../../../../context/shop-context';
import LoadingSpinner from '../../../../assets/Spinner-1s-200px.svg';
import FoodDetailsModal from './FoodDetailsModal';

const OrderFoods = () => {
    const { addToCart } = useContext(ShopContext);
    const { foods, loading: foodsLoading } = useGetAllFoodItems();
    const [isLoading, setIsLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const foodsByCategory = foods.reduce((acc, food) => {
        if (!acc[food.category]) {
            acc[food.category] = [];
        }
        acc[food.category].push(food);
        return acc;
    }, {});

    const handleAddToCart = (e, id) => {
        e.stopPropagation();
        addToCart(id);
    };

    const triggerModal = (item) => {
        setSelectedItem(item);
        setOpenModal(true);
    };

    const closeModal = () => {
        setOpenModal(false);
        setSelectedItem(null);
    };

    useEffect(() => {
        setIsLoading(foodsLoading);
    }, [foodsLoading]);

    return (
        <div className='p-2 my-2'>
            {Object.keys(foodsByCategory).map((category) => (
                <div key={category} id={category}>
                    <h2 className='text-lg mt-8 mb-4 font-semibold'>{category}</h2>
                    <div className='grid grid-cols-3 max-sm:grid-cols-2 gap-4'>
                        {foodsByCategory[category].map((item) => (
                            <div 
                                key={item._id} 
                                className='px-5 pb-5 w-full max-w-sm bg-white border shadow border-neutral-300 hover:border-orange-500 transition duration-300 rounded-lg'
                                onClick={() => triggerModal(item)}
                            >
                                {isLoading ? (
                                    <img src={LoadingSpinner} alt="spinner" className='p-8 rounded-t-lg' />
                                ) : (
                                    <img src={`${import.meta.env.VITE_BASE_URL}/images/${item.image}`} className='w-60' alt="image" />
                                )}

                                <div className='grid grid-rows-2'>
                                    <div className='flex justify-start items-center'>
                                        <h1 className='text-md font-semibold tracking-tight text-gray-700'>{item.name}</h1>
                                    </div>

                                    <div className='flex items-center justify-between'>
                                        <span className="text-2xl font-semibold text-gray-800">Rs.{item.price}</span>
                                        <div className='text-right'>
                                            <Button className="!px-3" onClick={(e) => handleAddToCart(e, item._id)}>+</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            {openModal && selectedItem && (
                <FoodDetailsModal 
                    closeModal={closeModal} 
                    item={selectedItem} 
                />
            )}
        </div>
    );
};

export default OrderFoods;
