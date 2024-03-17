import React from 'react'
import ImageCarousel from './ImageCarousel';
import OrderFoods from './OrderFoods';
import RecommendedFoodItems from './RecommendedFoodItems';
import Offers from './Offers';


const OrderBody = () => {
  return (
    <div>
        <ImageCarousel />
        <div>
          <OrderFoods foodItem="Burger" />
          <OrderFoods foodItem="Pizza" />
          <OrderFoods foodItem="Momo" />
          <OrderFoods foodItem="Chowmein" />
        </div>
        <div>
          <Offers />
        </div>
    </div>
  )
}

export default OrderBody