import React, { useContext } from 'react'
import { ShopContext } from '../../../../context/shop-context'
import { FoodProductsData } from '../FoodProductsData';
import Button from '../../../template/Button';
import useAuth from '../../../../context/authContext'
import { Link } from 'react-router-dom';

const CheckoutPopup = ({onClose}) => {
    const {isAuthenticated} = useAuth();
   const{cartItems,getTotalAmount}= useContext(ShopContext);
   const totalAmount = getTotalAmount();
  return (
    <div className='fixed top-0 left-0 w-full h-full z-50 backdrop-blur-sm backdrop-brightness-50 flex justify-center items-center'>
        <div className='bg-white rounded-lg p-8 shadow-lg'>
            {isAuthenticated ? (
                <>
                    <h1 className='text-xl'>Your Order</h1>
                    {
                        FoodProductsData.map(
                            (item)=>
                                cartItems[item.id] !== 0 &&
                                (
                                    <div key={item.id} className='grid grid-cols-3 items-center gap-4'>
                                        <img src={item.foodimg} className="w-20" alt="pop" />
                                        <h1>{item.foodName} x{cartItems[item.id]}</h1>
                                        <h1 className='text-orange-500 text-lg'>Rs. {cartItems[item.id]*item.price}</h1>
                                    </div>
                                )
                            
                        )
                    }
                    <h1 className='text-xl text-orange-500 border-t-2 border-orange-500 p-2 mt-2 mx-4 text-right'> Total: Rs {totalAmount}</h1>
                    <div className='flex gap-4 mt-3 justify-center'>
                        <Button onClick={onClose} >Proceed To Checkout</Button>
                        <Button onClick={onClose} className="!bg-white !text-orange-500 border-2 border-orange-500">Return Back</Button>
                    </div>
                </>
            ):(
                <>
                    <h1>Sign in First!</h1>
                    <div className='flex gap-4 mt-3 justify-center'>
                            <Link to='/sign-in-form'><Button>Proceed To Sign In </Button></Link>
                            <Button onClick={onClose} className="!bg-white !text-orange-500 border-2 border-orange-500">Return Back</Button>
                    </div>
                </>
            )}
            
        </div>
    </div>
  )
}

export default CheckoutPopup