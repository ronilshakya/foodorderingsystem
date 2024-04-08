import cartImg from './img/empty-cart.png'
import check from './img/check.png'
import Button from '../../../template/Button'
import useGetAllFoodItems from '../../../../hooks/useGetAllFoodItems'
import { ShopContext } from '../../../../context/shop-context'
import { useContext, useState } from 'react'
import CheckoutPopup from './CheckoutPopup'
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../../context/authContext'
import Swal from 'sweetalert2'

const OrderCart = () => {
  const {foods} = useGetAllFoodItems();
  const {cartItems,addToCart,removeFromCart,getTotalAmount} = useContext(ShopContext);
  let totalAmount = getTotalAmount();
  const {isAuthenticated} = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () =>{
    if(isAuthenticated){
      navigate('/checkout')
    }else{
      Swal.fire({
        icon: "error",
        title: `Please sign in first!`,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText:'Proceed to sign in',
        confirmButtonColor:'#F97316',
        focusConfirm: false,
        cancelButtonText:'Cancel'
    }).then((result)=>{
      if(result.isConfirmed){
        navigate('/sign-in-form')
      }else{
        navigate('/')
      }
    })
    }
  }

  return (
    <div className='px-2 font-semibold max-md:mt-4'>
      <div className='flex flex-col items-center static lg:fixed gap-3 py-5 px-4 rounded-lg border border-orange-500 custom-light-color'>

            <div className='theme-main-color px-8 py-2 rounded-lg'>
              <h1 className='text-lg text-white'>My Orders</h1>
            </div>

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
                                      <img src={`${import.meta.env.VITE_BASE_URL}/images/${item.image}`} className='w-20' alt="foodimg" />
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
                              <Button width={{width:'90%'}} onClick={handleCheckout}>Checkout order</Button>
                         
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