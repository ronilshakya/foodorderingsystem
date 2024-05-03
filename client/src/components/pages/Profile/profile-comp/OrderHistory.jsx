import React,{useEffect, useState} from 'react'
import Button from '../../../template/Button'

const OrderHistory = (props) => {
  return (
    <>
    <div>
        <h1 className='text-xl my-5'>Order History</h1>
        {props.orderByUsername === undefined || props.orderByUsername.length === 0 ? (
  <h1>No orders placed</h1>
) : (
  props.orderByUsername.slice().reverse().map((order, i) => {
    const orderStringObject = new Date(order.orderTime);
    const orderDateTime = orderStringObject.toLocaleString();
    const orderDay = orderStringObject.getDay();
    const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const orderWeekDay = weekDays[orderDay];

    let totalPriceForOrder = 0;

    return (
      <div key={i + 1} className='border border-neutral-300 rounded-xl mb-6 p-4'>
        <div className='flex justify-evenly my-2'>

          <h1 className='text-md py-2 px-3 rounded-lg bg-orange-500 text-white font-semibold'>
            {order.orderStatus}
          </h1>

          <h1 className='text-lg text-orange-500 font-semibold'>
            {orderWeekDay}, {orderDateTime}
          </h1>

        </div>
        <table className='border-none w-full my-8'>
          <thead>
            <tr className='border-none text-center'>
              <th className='border-none'>Image</th>
              <th className='border-none'>Name</th>
              <th className='border-none'>Quantity</th>
              <th className='border-none'>Subtotal</th>
            </tr>
          </thead>
          {Object.entries(order.orderFoodsHistory).map(([itemId, quantity]) => {
            if (quantity !== 0) {
              const item = props.foods.find(foodItem => foodItem._id === itemId);
              if (item) {
                const subTotal = item.price * quantity;
                totalPriceForOrder += subTotal;
                return (
                  <tbody key={itemId} className='text-center'>
                    <tr className='border-none'>
                      <td className='border-none flex justify-center'><img src={`${import.meta.env.VITE_BASE_URL}/images/${item.image}`} className='w-20' alt="checkout" /></td>                        
                      <td className='border-none'><h1>{item.name}</h1></td>
                      <td className='border-none'><h1>{quantity}</h1></td>
                      <td className='border-none'><h1>Rs. {subTotal}</h1></td>
                    </tr>
                  </tbody>
                );
              }
            }
          })}
          <tfoot>
            <tr className='border-none'>
              <td colSpan='3' className='border-none'></td>
              <td className='border-none text-center'>
                <h1 className='text-lg border-t-2 border-orange-500 text-orange-500 font-semibold p-2'>Total: Rs. {totalPriceForOrder}</h1>            
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  })
)}
      </div>
    </>
  )
}

export default OrderHistory