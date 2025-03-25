import React, { useEffect, useState, useMemo, useRef } from 'react';
import useGetOrder from '../../../hooks/useGetOrder';
import useAuth from '../../../context/authContext';
import Button from '../../template/Button';
import { MdOutlineRestaurant } from "react-icons/md";
import { MdExpandMore } from "react-icons/md";
import useGetAllFoodItems from '../../../hooks/useGetAllFoodItems';
import Swal from 'sweetalert2';

const MyOrders = () => {
    const { orderByUsername, getOrderByUsername } = useGetOrder();
    const { userData } = useAuth();
    const { foods } = useGetAllFoodItems();
    const [openDetails, setOpenDetails] = useState({});
    const previousOrderStatuses = useRef({});

    useEffect(() => {
        if (userData !== null) {
            getOrderByUsername(userData.username);
        }
    }, [userData, getOrderByUsername]);

    useEffect(() => {
        if (orderByUsername) {
            orderByUsername.forEach(order => {
                if (previousOrderStatuses.current[order._id] && previousOrderStatuses.current[order._id] !== order.orderStatus) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Your recent order is ${order.orderStatus}`,
                        showConfirmButton: true
                    });
                }
                previousOrderStatuses.current[order._id] = order.orderStatus;
            });
        }
    }, [orderByUsername]);

    const formatRelativeDate = (dateString) => {
        const inputDate = new Date(dateString);
        const currentDate = new Date();
        inputDate.setHours(0, 0, 0, 0);
        currentDate.setHours(0, 0, 0, 0);
        const oneDay = 24 * 60 * 60 * 1000;
        const diffDays = (currentDate - inputDate) / oneDay;
        if (diffDays === 0) {
            return 'Today';
        } else if (diffDays === 1) {
            return 'Yesterday';
        } else if (diffDays < 7) {
            return `${Math.floor(diffDays)} days ago`;
        } else {
            return 'Older';
        }
    };

    const groupedOrders = useMemo(() => {
        return orderByUsername ? orderByUsername.reduce((acc, order) => {
            const relativeDate = formatRelativeDate(order.orderTime);
            if (!acc[relativeDate]) {
                acc[relativeDate] = [];
            }
            acc[relativeDate].push(order);
            return acc;
        }, {}) : {};
    }, [orderByUsername]);

    const getOrderStatusMessage = (orderStatus) => {
        switch (orderStatus) {
            case 'Order placed':
                return 'Your order has been accepted by the restaurant';
            case 'In the kitchen':
                return 'Your order is in the kitchen';
            case 'On the way':
                return 'Your order is on the way';
            case 'Delivered':
                return 'Your order has been delivered';
            default:
                return 'Your order has been accepted by the restaurant';
        }
    };

    const toggleDetails = (orderId) => {
        setOpenDetails(prevState => ({
            ...prevState,
            [orderId]: !prevState[orderId]
        }));
    };

    return (
        <div className="page-template">
            <div className="border border-neutral-400 my-5 py-4 px-6 rounded-md">
                {userData === null ? (
                    <div className="text-center">
                        <h1>Please log in first!</h1>
                        <Button>Log In</Button>
                    </div>
                ) : (
                    <div>
                        {orderByUsername && orderByUsername.length > 0 ? (
                            Object.keys(groupedOrders).reverse().map((relativeDate) => ( 
                                <div key={relativeDate}>
                                    <h3 className="font-bold mt-4">{relativeDate}</h3>
                                    <ul className='relative border-s border-gray-400 ms-3.5 my-4 md:mb-5'>
                                        {groupedOrders[relativeDate].map((order) => (
                                            <li key={order._id} className="border-b border-neutral-300 mb-10 ms-10 p-4 rounded-lg hover:bg-neutral-100 transition-colors duration-200" onClick={() => toggleDetails(order._id)}>
                                                <div className='flex justify-between'>
                                                    <div>
                                                        <span className="absolute flex items-center justify-center w-10 h-10 bg-orange-400 rounded-full -start-3.5 ring-8 ring-white">
                                                            <MdOutlineRestaurant color='white' fontSize="1.5em" />
                                                        </span>
                                                        <p className="font-semibold">
                                                            {getOrderStatusMessage(order.orderStatus)}
                                                        </p>
                                                        <p className="text-sm text-neutral-600">{new Date(order.orderTime).toLocaleString()}</p>

                                                        <div className={`overflow-hidden transition-max-height duration-300 relative top-3 ${openDetails[order._id] ? 'max-h-screen' : 'max-h-0'}`}>
                                                            <h3>Order Details:</h3>

                                                            <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
                                                            <table className='w-full text-sm text-gray-500 border-2 my-4'>
                                                                <thead className='text-xs text-white uppercase bg-orange-400'>
                                                                    <tr>
                                                                        <th className='px-6 py-3'>Menu</th>
                                                                        <th className='px-6 py-3'>Food name</th>
                                                                        <th className='px-6 py-3'>Quantity</th>
                                                                        <th className='px-6 py-3'>Address</th>
                                                                        <th className='px-6 py-3'>Total</th>
                                                                    </tr>
                                                                </thead>
                                                                {Object.entries(order.orderFoodsHistory).map(([itemId, quantity]) => {
                                                                    if (quantity !== 0) {
                                                                        const item = foods.find(foodItem => foodItem._id === itemId);
                                                                        if (item) {
                                                                            const subTotal = item.price * quantity;
                                                                            return (
                                                                                <tbody key={itemId} className='text-center'>
                                                                                    <tr className='bg-white border-b'>
                                                                                        <td className='border-none flex justify-center'>
                                                                                                <img src={`${import.meta.env.VITE_BASE_URL}/images/${item.image}`} className='w-20 row-span-2' alt="checkout" />                                                                                                
                                                                                        </td>
                                                                                        <td className='border-none'><h1><h1>{item.name}</h1></h1></td>
                                                                                        <td className='border-none'><h1><h1>{quantity}</h1></h1></td>
                                                                                        <td className='border-none'><h1>{order.orderAddress}</h1></td>
                                                                                        <td className='border-none'><h1>Rs. {subTotal}</h1></td>
                                                                                    </tr>
                                                                                    
                                                                                </tbody>
                                                                            );
                                                                        }
                                                                    }
                                                                })}
                                                            </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button className='absolute right-2'>
                                                        <MdExpandMore fontSize='1.5em' className={`transition-transform duration-300 ${openDetails[order._id] ? 'rotate-180' : ''}`} />
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-neutral-600">No orders found. Start ordering your favorite meals now!</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrders;
