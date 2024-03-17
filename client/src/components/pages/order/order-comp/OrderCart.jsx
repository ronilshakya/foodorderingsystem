import cartImg from './img/empty-cart.png'
import check from './img/check.png'
import Button from '../../../template/Button'
import { FoodProductsData } from '../FoodProductsData'
import { ShopContext } from '../../../../context/shop-context'
import { useContext, useState } from 'react'
import CheckoutPopup from './CheckoutPopup'

const OrderCart = () => {
  const {cartItems,addToCart,removeFromCart,getTotalAmount} = useContext(ShopContext);
  let totalAmount = getTotalAmount();

  // checkout popup
  const [isPopupOpen,setIsPopupOpen] = useState(false);
  const openPopup = () =>{
    setIsPopupOpen(true)
  }
  const closePopup = () =>{
    setIsPopupOpen(false)
  }
  return (
    <div className='p-2 font-semibold'>
      <div className='flex flex-col items-center gap-4 py-5 px-4 rounded-lg border border-orange-500 custom-light-color'>

            <div className='theme-main-color px-8 py-4 rounded-lg'>
              <h1 className='text-lg text-white'>My Orders</h1>
            </div>
        
            <div className='flex items-center gap-1 border border-orange-500 bg-white rounded-lg p-2'>
                <img src={check} className='w-4' alt="check" />
                <h2>Delivery</h2>
            </div>

            {Object.values(cartItems).every(value=> value ===0) ?
                (
                  <div className='flex flex-col items-center gap-5'>
                     <img src={cartImg} className='w-40' alt="cart" />
                      <p className='text-neutral-600'>Cart is empty</p>
                  </div>
                ):(
                  <div>
                    {/* items cart */}
                      <div>
                        {FoodProductsData.map(
                          (item)=>{
                            if(cartItems[item.id] !== 0){
                              return(
                                <div key={item.id} className='grid grid-cols-4 mt-2 items-center p-2 my-5'>
                                  <div className='border border-orange-500 bg-white rounded-2xl overflow-hidden'>
                                    <img src={item.foodimg} className='w-20' alt="foodimg" />
                                  </div>
                                  <div className='col-span-2 px-3'>
                                    <h1 className='text-md'>{item.foodName}</h1>
                                  </div>
                                  <div className='flex flex-col gap-2'>
                                    <p>Rs. {item.price}</p>
                                    <div className='flex border border-orange-500 justify-evenly rounded-lg overflow-hidden'>
                                      <button className='order-btn' onClick={()=>removeFromCart(item.id)}>-</button>
                                      <input className='w-7 text-center' type="text" value={cartItems[item.id]}/>
                                      <button className='order-btn' onClick={()=>addToCart(item.id)}>+</button>
                                    </div>
                                  </div>
                                </div>
                              )
                            }
                          }
                        )}
                        <div className='border-t-2 border-orange-500 p-5'>
                          <div className='flex justify-between my-4'>
                            <p>Total: </p>
                            <h1 className='text-xl text-orange-500'>Rs. {totalAmount}</h1>
                          </div>
                          <div className='text-center'>
                            <Button width={{width:'90%'}} onClick={openPopup}>Checkout order</Button>
                            {isPopupOpen && <CheckoutPopup onClose={closePopup}/>}
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