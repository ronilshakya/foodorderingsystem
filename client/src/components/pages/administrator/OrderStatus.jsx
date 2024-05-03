import React, { useEffect, useState } from 'react'
import useGetOrder from '../../../hooks/useGetOrder'
import { FaHistory } from "react-icons/fa";
import OrderModal from './admin-comp/OrderModal';
import useUpdateOrder from '../../../hooks/useUpdateOrder';

const OrderStatus = () => {
  const {getAllOrders, allOrders} = useGetOrder();
  const [openedModal, setOpenedModal] = useState(false);
  const [modalUser, setModalUser] = useState({});
  const {updateOrder} = useUpdateOrder();
  const openModal = (order) =>{
    setOpenedModal(true);
    setModalUser(order)
  }
  
  const closeModal = () =>{
    setOpenedModal(false);
  }

  useEffect(()=>{
    getAllOrders();
  },[])

  const triggerUpdate = (orderId, e) =>{
    const obj = {
      orderStatus: e
    }
    updateOrder(orderId,obj);
  }

  return (
    <div className='page-template'>
       <h1 className='text-2xl my-4'>All Orders</h1>
      <h1 className='text-2xl my-4'>{allOrders && allOrders.length} Orders</h1>
      <div className='flex flex-col'>
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className='min-w-full text-left text-sm font-semibold text-surface'>
                <thead className='bg-orange-500 text-white'>
                  <tr>
                    <th scope="col" className="table-data">SN.</th>
                    <th scope="col" className="table-data">Username</th>
                    <th scope="col" className="table-data">Order Time</th>
                    <th scope="col" className="table-data">Order Status</th>
                    <th scope="col" className="table-data">Ordered Foods</th>
                  </tr>
                </thead>
                <tbody>
                  {allOrders ?(
                    allOrders.slice().reverse().map((order,i)=>(
                      <tr key={order._id}>
                        <td className="table-data whitespace-nowrap">{i+1}</td>

                        <td className="table-data whitespace-nowrap">{order.orderUser}</td>

                        <td className="table-data whitespace-nowrap">{order.orderTime}</td>

                        <td className="table-data whitespace-nowrap">
                          <div className="max-w-sm mx-auto">
                          <select onChange={(e) => triggerUpdate(order._id, e.target.value)} className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5">
                            {['Order placed', 'In the kitchen', 'On the way', 'Delivered'].map((status) => (
                              <option key={status} value={status} selected={order.orderStatus === status}>
                                {status}
                              </option>
                            ))}
                          </select>

                          </div>
                        </td>

                        <td className="table-data whitespace-nowrap">
                          <button onClick={()=>openModal(order)} className='border bg-orange-600 py-1 px-2 rounded-lg text-white font-semibold flex items-center gap-1 justify-center'>
                            <FaHistory />
                          </button>
                        </td>
                      </tr>
                    ))
                  ):(<tr><td colSpan={5}>Loading</td></tr>)
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {openedModal ? (
        <>
          <OrderModal modalUser={modalUser} closeModal={closeModal} />
        </>
      ):(<></>)}
    </div>
  )
}

export default OrderStatus