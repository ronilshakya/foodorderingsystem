import React,{useContext,useEffect,useState} from 'react';
import useGetAllFoodItems from '../../../../hooks/useGetAllFoodItems';
import Button from '../../../template/Button';
import { ShopContext } from '../../../../context/shop-context';
import LoadingSpinner from '../../../../assets/Spinner-1s-200px.svg';


const OrderFoods = () => {
    const {addToCart} = useContext(ShopContext);
    const { foods, loading: foodsLoading } = useGetAllFoodItems();
    const [isLoading, setIsLoading] = useState(true);

    const foodsByCategory = foods.reduce((acc, food) => {
        if (!acc[food.category]) {
            acc[food.category] = [];
        }
        acc[food.category].push(food);
        return acc;
    }, {});
    
    useEffect(()=>{
        setIsLoading(foodsLoading)
    },[foodsLoading])

    return (
        <div className='p-2 my-2'>
                {Object.keys(foodsByCategory).map((category) => (
                    <div key={category} id={category}>
                        <h2 className='text-lg mt-8 mb-4 font-semibold'>{category}</h2>
                        <div className='grid grid-cols-3 max-sm:grid-cols-2 gap-4'>
                            {foodsByCategory[category].map((item) => (
                                <div key={item._id} className='md:px-6 px-2 py-6 border-2 border-neutral-300 hover:border-orange-500 transition duration-300 rounded-lg'>
                                    {isLoading?(
                                        <img src={LoadingSpinner} alt="spinner" className='w-60' />
                                    ):(
                                        <img src={`http://localhost:8000/images/${item.image}`} className='w-60' alt="image" />
                                    )}
                                    
                                    <div className='grid grid-rows-2'>
                                        <div className='flex justify-start  items-center'>
                                            <h1 className='font-semibold text-md'>{item.name}</h1>
                                        </div>
                                        <div className='grid grid-cols-2 items-center'>
                                            <div>
                                                <p className='text-orange-500 text-xl font-bold'>Rs. {item.price}</p>
                                            </div>
                                            <div className='text-right'>
                                                <Button className="!px-3" onClick={()=>addToCart(item._id)}>+</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default OrderFoods;
