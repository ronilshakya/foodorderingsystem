import React, { useEffect, useState } from 'react';
import useGetOrder from '../../../hooks/useGetOrder';
import useGetAllFoodItems from '../../../hooks/useGetAllFoodItems';

const GenerateReport = () => {
    const { getAllOrders, allOrders } = useGetOrder();
    const [ordersByMonth, setOrdersByMonth] = useState({});
    const [monthlySales, setMonthlySales] = useState({});
    const { foods, loading: foodsLoading } = useGetAllFoodItems(); // Assuming a loading state is returned

    useEffect(() => {
        getAllOrders();
    }, [getAllOrders]);

    useEffect(() => {
        if (allOrders) {
            const mappedOrders = mapOrdersByMonth(allOrders);
            setOrdersByMonth(mappedOrders);
            calculateMonthlySales(mappedOrders);
        }
    }, [allOrders]);

    const mapOrdersByMonth = (orders) => {
        const monthMap = {
            0: "January", 1: "February", 2: "March", 3: "April", 4: "May", 5: "June",
            6: "July", 7: "August", 8: "September", 9: "October", 10: "November", 11: "December"
        };

        const ordersByMonth = Object.values(monthMap).reduce((acc, month) => {
            acc[month] = [];
            return acc;
        }, {});

        orders.forEach(order => {
            const orderDate = new Date(order.orderTime);
            const month = orderDate.getMonth();
            const monthName = monthMap[month];

            // Aggregate items within the same order
            const aggregatedOrderItems = Object.entries(order.orderFoodsHistory).reduce((acc, [itemId, quantity]) => {
                if (quantity > 0) {
                    acc[itemId] = (acc[itemId] || 0) + quantity;
                }
                return acc;
            }, {});

            ordersByMonth[monthName].push({
                ...order,
                orderFoodsHistory: aggregatedOrderItems
            });
        });

        // Remove months with no orders
        for (const month in ordersByMonth) {
            if (ordersByMonth[month].length === 0) {
                delete ordersByMonth[month];
            }
        }

        return ordersByMonth;
    };

    const calculateMonthlySales = (ordersByMonth) => {
        const sales = {};

        Object.keys(ordersByMonth).forEach(month => {
            let totalSales = 0;
            ordersByMonth[month].forEach(order => {
                Object.entries(order.orderFoodsHistory).forEach(([itemId, quantity]) => {
                    if (quantity > 0) {
                        const item = foods.find(foodItem => foodItem._id === itemId);
                        if (item) {
                            totalSales += item.price * quantity;
                        }
                    }
                });
            });
            sales[month] = totalSales;
        });

        setMonthlySales(sales);
    };

    if (foodsLoading) {
        return <div>Loading food items...</div>;
    }

    return (
        <div className='page-template'>
            {Object.keys(ordersByMonth).length > 0 ? (
                <div>
                    {Object.keys(ordersByMonth).map(month => (
                        <div key={month} className='mb-8'>
                            <div className='my-4'>
                                <h2 className='text-2xl font-bold'>{month} 2024</h2>
                                <p><strong>Total Sales:</strong> Rs {monthlySales[month].toFixed(2)}</p>
                            </div>
                            <table className='min-w-full text-left text-sm font-semibold text-surface'>
                                <thead className='bg-orange-500 text-white'>
                                    <tr>
                                        <th className='border p-2'>Item</th>
                                        <th className='border p-2'>Quantity</th>
                                        <th className='border p-2'>Price</th>
                                        <th className='border p-2'>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(ordersByMonth[month].reduce((acc, order) => {
                                        Object.entries(order.orderFoodsHistory).forEach(([itemId, quantity]) => {
                                            if (quantity > 0) {
                                                acc[itemId] = (acc[itemId] || 0) + quantity;
                                            }
                                        });
                                        return acc;
                                    }, {})).map(([itemId, quantity]) => {
                                        const item = foods.find(foodItem => foodItem._id === itemId);
                                        if (item) {
                                            return (
                                                <tr key={itemId}>
                                                    <td className='border p-2'>{item.name}</td>
                                                    <td className='border p-2'>{quantity}</td>
                                                    <td className='border p-2'>{item.price}</td>
                                                    <td className='border p-2'>{item.price * quantity}</td>
                                                </tr>
                                            );
                                        }
                                        return null;
                                    })}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No orders to display</p>
            )}
        </div>
    );
};

export default GenerateReport;
