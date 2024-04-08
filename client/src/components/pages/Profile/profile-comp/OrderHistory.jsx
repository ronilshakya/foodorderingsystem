import React,{useState} from 'react'
import Button from '../../../template/Button'

const OrderHistory = (props) => {
  const [showAll, setShowAll] = useState(false);
  const toggleShowAll = () =>{
    setShowAll(!showAll);
  }
  return (
    <>
    <div>
        <h1 className='text-xl my-5'>Order History</h1>
        {props.orderHistoryObject.orderHistory === undefined ? (
          <h1>No orders placed</h1>
        ) : (
          props.orderHistoryObject.orderHistory.slice(0, showAll ? props.orderHistoryObject.orderHistory.length : 4).reverse().map((obj, i) => {
            const orderStringObject = new Date(obj.orderTime);
            const orderDateTime = orderStringObject.toLocaleString();
            const orderDay = orderStringObject.getDay();
            const weekDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
            const orderWeekDay = weekDays[orderDay];

            let totalPriceForOrder = 0;
            return(
            <div key={i + 1} className='border border-neutral-300 rounded-xl mb-6 p-4'>
              <div className=''>
                <h1 className='text-center text-lg text-orange-500 font-semibold'>{orderWeekDay}, {orderDateTime}</h1>
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
                {props.foods.map((item) => {
                  if (obj[item._id] !== 0) {
                    const subTotal = item.price * obj[item._id];
                    totalPriceForOrder += subTotal;
                    return (
                        <tbody key={item._id} className='text-center'>
                          <tr className='border-none'>
                            <td className='border-none flex justify-center'><img src={`${import.meta.env.VITE_BASE_URL}/images/${item.image}`} className='w-20' alt="checkout" /></td>                        
                            <td className='border-none'><h1>{item.name}</h1></td>
                            <td className='border-none'><h1>{obj[item._id]}</h1></td>
                            <td className='border-none'><h1>Rs. {subTotal}</h1></td>
                          </tr>
                        </tbody>
                    );
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
          )})
        )}
        {props.orderHistoryObject.orderHistory.length > 4 &&(
          <div className='text-center'>
            <Button onClick={toggleShowAll}>
              {showAll ? 'Show Less' : 'Show more'}
            </Button>
          </div>
        )}
      </div>
    </>
  )
}

export default OrderHistory