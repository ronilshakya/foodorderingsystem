import React, { useContext } from 'react'
import {FoodProductsData} from '../FoodProductsData';
import Button from '../../../template/Button';
import { ShopContext } from '../../../../context/shop-context';

const OrderFoods = (props) => {
    const {addToCart} = useContext(ShopContext);
    const foodItem = props.foodItem;
  return (
    <div id={`${foodItem}`} className='p-2 my-4'>
        <h1 className='text-lg my-2 font-semibold'>{foodItem}</h1>
        <div className='grid grid-cols-3 max-sm:grid-cols-2 gap-4'>
        {
                FoodProductsData.filter(item=>item.foodName.toLowerCase().includes(foodItem.toLowerCase())).map(
                    item =>(
                        <div key={item.id} className='p-6 border-2 border-neutral-300 hover:border-orange-500 transition duration-300 rounded-lg'>
                            <img src={item.foodimg} className='w-60' alt="food" />
                            <div className='m-auto'>
                                <h1 className='font-semibold text-md'>{item.foodName}</h1>
                                <div className='flex justify-between items-center'>
                                    <p className='text-orange-500 text-xl font-bold'>Rs. {item.price}</p>
                                    <Button className="!px-3" onClick={()=>addToCart(item.id)}>+</Button>
                                </div>
                            </div>
                        </div>
                    )
                )
            }
        </div>
        <div>
            
        </div>
    </div>
  )
}

export default OrderFoods