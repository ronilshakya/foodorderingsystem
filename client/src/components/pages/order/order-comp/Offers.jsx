import React from 'react'
import img1 from './img/offer1.jpg';
import Button from '../../../template/Button';

const Offers = () => {
  return (
    <div id='offers'>
        <h1 className='text-lg my-2 font-semibold'>Offers</h1>
        <div id='10%Offer'className='my-5'>
          <div className='flex items-center gap-8 border border-orange-500 rounded-2xl overflow-hidden'>
            <img src={img1} className='w-64' alt="" />
            <div className='font-semibold'>
              <h1 className='text-xl mb-3'>10% Off!</h1>
              <p className=' text-neutral-500 mb-4'>You can enjoy up to 10% off on all food items. This is a wonderful opportunity to save some money while enjoying delicious meals. Make sure to take advantage of this offer before it expires.</p>
              <Button>View Offer</Button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Offers