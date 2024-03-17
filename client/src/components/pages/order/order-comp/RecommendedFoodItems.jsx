import React, {useState} from 'react'
import { FoodProductsData } from '../FoodProductsData'
import Button from '../../../template/Button'

const RecommendedFoodItems = () => {
    const recommendedFoodsArr = FoodProductsData.filter(item => item.recommended === true);
  return (
    <div>
        <h1>Recommended Foods</h1>
                <div className='grid gap-5 grid-cols-6 grid-rows-1 transition-transform ease-in-out'>
                    {
                        recommendedFoodsArr.map(item =>(
                            <div key={item.id} className='w-full p-6 border-2 border-neutral-300 hover:border-orange-500 transition duration-300 rounded-lg'>
                                <img src={item.foodimg} className='w-60' alt="food" />
                                <div className='m-auto'>
                                    <h1 className='font-semibold text-md'>{item.foodName}</h1>
                                    <div className='flex justify-between items-center'>
                                        <p className='text-orange-500 text-xl font-bold'>Rs. {item.price}</p>
                                        <Button className="!px-3" onClick={()=>addToCart(item.id)}>+</Button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
  )
}

export default RecommendedFoodItems