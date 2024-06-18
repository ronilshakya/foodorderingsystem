import React, { useEffect, useState } from 'react'
import useGetOrder from '../../../hooks/useGetOrder'
import { FaHistory, FaTrashAlt } from "react-icons/fa";
import OrderModal from './admin-comp/OrderModal';
import useUpdateOrder from '../../../hooks/useUpdateOrder';
import useDeleteOrder from '../../../hooks/useDeleteOrder';
import Swal from 'sweetalert2';
import useGetAllFoodItems from '../../../hooks/useGetAllFoodItems';

const OrderStatus = () => {
  const { getAllOrders, allOrders } = useGetOrder();
  const [openedModal, setOpenedModal] = useState(false);
  const [modalUser, setModalUser] = useState({});
  const { updateOrder } = useUpdateOrder();
  const { deleteOrder } = useDeleteOrder();
  const {foods} = useGetAllFoodItems();

  const openModal = (order) => {
    setOpenedModal(true);
    setModalUser(order);
  };

  const closeModal = () => {
    setOpenedModal(false);
  };

 
  const triggerUpdate = (orderId, e) => {
    const obj = {
      orderStatus: e,
    };
    updateOrder(orderId, obj);
  };

  const handleDelete = (name, id) => {
    Swal.fire({
      title: "Warning",
      text: `Are you sure you want to delete order of ${name}?`,
      icon: "question",
      position: "center",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#F97316",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteOrder(id);
      }
    });
  };

  useEffect(() => {
    getAllOrders();
    console.log(allOrders)
  }, [deleteOrder]);


  return (
    <div className="page-template">
      <h1 className="text-2xl my-4">All Orders</h1>
      <h1 className="text-2xl my-4">{allOrders && allOrders.length} Orders</h1>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-semibold text-surface">
                <thead className="bg-orange-500 text-white">
                  <tr>
                    <th scope="col" className="table-data">
                      SN.
                    </th>
                    <th scope="col" className="table-data">
                      Username
                    </th>
                    <th scope="col" className="table-data">
                      Order Time
                    </th>
                    <th scope="col" className="table-data">
                      Order Status
                    </th>
                    <th scope="col" className="table-data">
                      Ordered Foods
                    </th>
                    <th scope="col" className="table-data">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allOrders ? (
                    allOrders
                      .slice()
                      .reverse()
                      .map((order, i) => (
                        <tr key={order._id}>
                          <td className="table-data whitespace-nowrap">{i + 1}</td>

                          <td className="table-data whitespace-nowrap">{order.orderUser}</td>

                          <td className="table-data whitespace-nowrap">{order.orderTime}</td>

                          <td className="table-data whitespace-nowrap">
                            <div className="max-w-sm mx-auto">
                              <select
                                onChange={(e) => triggerUpdate(order._id, e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"
                              >
                                {[
                                  "Order placed",
                                  "In the kitchen",
                                  "On the way",
                                  "Delivered",
                                ].map((status) => (
                                  <option
                                    key={status}
                                    value={status}
                                    selected={order.orderStatus === status}
                                  >
                                    {status}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </td>

                          <td className='table-data'>
                            <table className='min-w-full text-left text-sm font-semibold text-surface'>  
                              <thead className='bg-orange-500 text-white'>
                                <tr>
                                  <th>Name</th>
                                  <th>Quantity</th>
                                </tr>
                              </thead>  
                              <tbody> 
                              {Object.entries(order.orderFoodsHistory).map(([itemId, quantity]) => {
                                if (quantity !== 0) {
                                const item = foods.find(foodItem => foodItem._id === itemId);
                                if (item) {
                                  return (
                                        <tr className='border-none'>
                                          <td>
                                            <h1>{item.name}</h1>
                                          </td>
                                          <td>
                                            <h1>{quantity}</h1>
                                          </td>
                                        </tr>
                                      );
                                    }
                                  }
                                })}
                              </tbody>        
                            </table>
                          </td>

                          <td className="table-data">
                            <button
                              onClick={() => handleDelete(order.orderUser, order._id)}
                              className="border bg-red-600 py-1 px-2 rounded-lg text-white font-semibold flex items-center gap-1 justify-center"
                            >
                              <FaTrashAlt />
                            </button>
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td colSpan={5}>Loading</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Render OrderModal if openedModal is true */}
      {openedModal && <OrderModal modalUser={modalUser} closeModal={closeModal} />}
    </div>
  );
};

export default OrderStatus;
