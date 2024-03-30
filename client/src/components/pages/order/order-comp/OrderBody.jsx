import React from 'react'
import ImageCarousel from './ImageCarousel';
import OrderFoods from './OrderFoods';
import Offers from './Offers';


const OrderBody = () => {
  return (
    <div>
        <ImageCarousel />
        <div>
          <OrderFoods />
        </div>
        <div>
          <Offers />
        </div>
    </div>
  )
}

export default OrderBody