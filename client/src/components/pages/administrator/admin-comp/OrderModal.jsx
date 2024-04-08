import React, { useEffect } from 'react'
import useGetAllFoodItems from '../../../../hooks/useGetAllFoodItems';
import useGetOrderHistory from '../../../../hooks/useGetOrderHistory';
import useAuth from '../../../../context/authContext';
import { SlCalender } from "react-icons/sl";

const OrderModal = (props) => {
    const {modalUser,closeModal} = props;
    const {foods} = useGetAllFoodItems();
    const { orderHistoryObject, getOrderHistory } = useGetOrderHistory();

    useEffect(()=>{
          getOrderHistory(modalUser._id)
          console.log(orderHistoryObject)
    },[])
  return (
    <>
    <div class="backdrop-brightness-50 flex overflow-y-auto overflow-x-hidden fixed top-0 bottom-0 right-0 left-0 z-50 justify-center items-center w-full max-h-full">
    <div class="relative p-4 w-full h-full max-w-md max-h-full">
        <div class="relative bg-white rounded-lg shadow-lg ">
                <div class="flex items-center justify-between p-4 md:p-5 border-b border-gray-400 rounded-t ">
                    <h3 class="text-lg font-semibold text-gray-900 ">
                        {modalUser.username}'s order history
                    </h3>
                    <button onClick={closeModal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center">
                    <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    </button>
                </div>
                <div class="p-4 md:p-5 overflow-y-auto" style={{height:'80vh'}}>
                    <ol class="relative border-s border-gray-400  ms-3.5 mb-4 md:mb-5"> 
                    {!orderHistoryObject?.orderHistory || orderHistoryObject.orderHistory.length === 0 ? (
                        <h1>No orders placed</h1>
                    ) : (
                      orderHistoryObject.orderHistory.slice().reverse().map((obj, i) => {
                        const orderStringObject = new Date(obj.orderTime);
                        const orderDateTime = orderStringObject.toLocaleString();
                        const orderDay = orderStringObject.getDay();
                        const weekDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
                        const orderWeekDay = weekDays[orderDay];
            
                        let totalPriceForOrder = 0;
                        return(
                        <li class="mb-10 ms-8">            
                          <span class="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -start-3.5 ring-8 ring-white">
                            <SlCalender />
                          </span>
                          <time class="block mb-3 text-sm font-normal leading-none text-gray-500">{orderWeekDay}, {orderDateTime}</time>
                          <div>
                            {foods.map((item) => {
                              if (obj[item._id] !== 0) {
                                const subTotal = item.price * obj[item._id];
                                totalPriceForOrder += subTotal;
                                return (
                                    <div key={item._id} className='grid grid-cols-3'>      
                                        <div className='my-2'>
                                          <h1>{item.name}</h1>
                                        </div>
                                        <div className='my-2 text-center'>
                                          <h1>{obj[item._id]}</h1>
                                        </div>
                                        <div className='my-2'>
                                          <h1>Rs. {subTotal}</h1>
                                        </div>
                                    </div>
                                );
                              }
                            })}                      
                            <h1 className='text-lg border-t-2 border-orange-500 text-orange-500 font-semibold p-2'>Total: Rs. {totalPriceForOrder}</h1>

                          </div>
                        </li>
                        )})
                    )}
                    </ol>
                </div>
            </div>
    </div>
</div> 
    </>
  )
}

export default OrderModal