import cartImg from './img/empty-cart.png'
import check from './img/check.png'
import Button from '../../../template/Button'
import useGetAllFoodItems from '../../../../hooks/useGetAllFoodItems'
import { ShopContext } from '../../../../context/shop-context'
import { useContext, useState } from 'react'
import CheckoutPopup from './CheckoutPopup'
import { Link } from 'react-router-dom';

const OrderCart = () => {
  const {foods} = useGetAllFoodItems();
  const {cartItems,addToCart,removeFromCart,getTotalAmount} = useContext(ShopContext);
  let totalAmount = getTotalAmount();

  // checkout popup
  return (
    <div className='px-2 font-semibold'>
      <div className='flex flex-col items-center static lg:fixed gap-3 py-5 px-4 rounded-lg border border-orange-500 custom-light-color'>

            <div className='theme-main-color px-8 py-2 rounded-lg'>
              <h1 className='text-lg text-white'>My Orders</h1>
            </div>
        
            {/* <div className='flex items-center gap-1 border border-orange-500 bg-white rounded-lg p-2'>
                <img src={check} className='w-4' alt="check" />
                <h2>Delivery</h2>
            </div> */}

            {Object.values(cartItems).every(value=> value ===0) ?
                (
                  <div style={{height:'27rem',width:'21rem'}} className='flex flex-col items-center justify-center gap-5'>
                     <img src={cartImg} className='w-52' alt="cart" />
                      <p className='text-neutral-600'>Cart is empty</p>
                  </div>
                ):(
                  <div>
                    {/* items cart */}
                      <div>
                        <div style={{height:'21rem'}} className='overflow-y-auto'>
                          {foods.map(
                            (item)=>{
                              if(cartItems[item._id] !== 0){
                                return(
                                  <div key={item._id} className='grid grid-cols-4 mt-1 items-center p-2 my-3'>
                                    <div className='border border-orange-500 bg-white rounded-2xl overflow-hidden'>
                                      <img src={`http://localhost:8000/images/${item.image}`} className='w-20' alt="foodimg" />
                                    </div>
                                    <div className='col-span-2 px-3'>
                                      <h1 className='text-md'>{item.name}</h1>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                      <p>Rs. {item.price}</p>
                                      <div className='grid grid-cols-3 border border-orange-500 justify-evenly rounded-lg overflow-hidden'>
                                        <button className='order-btn' onClick={()=>removeFromCart(item._id)}>-</button>
                                        <input className='w-7 text-center' type="text" value={cartItems[item._id]} readOnly/>
                                        <button className='order-btn' onClick={()=>addToCart(item._id)}>+</button>
                                      </div>
                                    </div>
                                  </div>
                                )
                              }
                            }
                          )}
                        </div>
                        <div className='border-t-2 border-orange-500 px-5'>
                          <div className='flex justify-between my-4'>
                            <p>Total: </p>
                            <h1 className='text-xl text-orange-500'>Rs. {totalAmount}</h1>
                          </div>
                          <div className='text-center'>
                            <Link to='/checkout'>
                              <Button width={{width:'90%'}}>Checkout order</Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                  </div>
                )
              }
      </div>
    </div>
  )
}

export default OrderCart