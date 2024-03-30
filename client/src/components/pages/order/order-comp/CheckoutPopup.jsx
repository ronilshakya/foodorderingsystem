import React, { useContext,useEffect,useState } from 'react';
import { ShopContext } from '../../../../context/shop-context';
import useGetAllFoodItems from '../../../../hooks/useGetAllFoodItems';
import useAddOrderHistory from '../../../../hooks/useAddOrderHistory';
import Button from '../../../template/Button';
import useAuth from '../../../../context/authContext';
import { Link } from 'react-router-dom';
import Input from '../../../template/Input'
import { useNavigate } from 'react-router-dom';

const CheckoutPopup = () => {
    const navigate = useNavigate();
    const { foods } = useGetAllFoodItems();
    const { isAuthenticated,userData } = useAuth();
    const { cartItems, getTotalAmount } = useContext(ShopContext);
    const totalAmount = getTotalAmount();
    const [checkoutItems, setCheckoutItems] = useState({});
    const {addOrderHistory} = useAddOrderHistory()

    useEffect(() => {
        setCheckoutItems(cartItems);
    }, [cartItems]);

    const handleCheckout = () => {
        const dateObj = new Date();
        const date = {
            orderTime: dateObj.toLocaleString()
        };
        checkoutItems.orderTime = date.orderTime;
        addOrderHistory(userData._id,{orderHistory: checkoutItems })
    };
    
    useEffect(()=>{
        if(Object.values(cartItems).every(value=> value ===0) ){
            navigate('/');
        }
    },[])
    return (
        <div className='page-template'>
            <div className='p-8'>
                {isAuthenticated ? (
                    <>
                    <div className='flex flex-col gap-4'>
                    <div className='flex flex-col justify-center p-5'>
                                    <h1 className='text-xl'>Your Order</h1>
                                <div className='my-4'>
                                    <table className='border-none'>
                                        <thead className='border-none'>
                                                <tr className='border-none'>
                                                    <th className='table-data border-none'>Image</th>
                                                    <th className='table-data border-none'>Food Item</th>
                                                    <th className='table-data border-none'>Subtotal</th>
                                                </tr> 
                                        </thead>
                                        <tbody>
                                    {foods.map(
                                        (item) =>
                                            cartItems[item._id] !== 0 && (
                                                <tr key={item._id} className='border-none'>
                                                    <td className='table-data border-none'>
                                                        <img src={`http://localhost:8000/images/${item.image}`} className='w-20' alt='pop' />
                                                    </td>
                                                    <td className='table-data border-none'>
                                                        <h1>
                                                            {item.name} x{cartItems[item._id]}
                                                        </h1>
                                                    </td>
                                                    <td className='table-data border-none text-center'>
                                                        <h1 className='text-orange-500 text-lg'>Rs. {cartItems[item._id] * item.price}</h1>
                                                    </td>
                                                </tr>
                                            )
                                    )}
                                        
                                        <tr className='table-data border-none'>
                                            <td colSpan='2' className='table-data border-none'></td>
                                            <td className='table-data border-none'>
                                                <h1 className='text-xl text-orange-500 border-t-2 border-orange-500 p-2 mt-2 mx-4 text-right'>
                                                    {' '}
                                                    Total: Rs {totalAmount}
                                                </h1>
                                            </td>
                                            
                                        </tr>
                                    </tbody>
                                    </table>
                                </div>
                            </div>
                        <div className='p-5 flex flex-col justify-center'>
                                <div className='flex flex-col my-4 gap-4'>
                                    <h1 className='text-xl'>Billing Address</h1>
                                    <Input type='number' placeholder='Enter Phone Number'/>
                                    <Input type='text' placeholder='Enter Address'/>
                                </div>
                                <div className='flex flex-col my-4 gap-4'>
                                    <h1 className='text-xl'>Payment Method</h1>
                                    <select name="" id="" className='border border-neutral-400 p-2 rounded-md text-neutral-600 focus:border-orange-400 focus:outline-none'>
                                        <option value="">Cash on delivery</option>
                                        <option value="">Esewa</option>
                                        <option value="">Khalti</option>
                                    </select>
                                </div>
                            </div>
                        
                        
                        
                    </div>
                    <div className='flex gap-4 mt-3 justify-center col-span-2'>
                            <Button onClick={handleCheckout}>Proceed To Checkout</Button>
                            <Link to='/'>
                                <Button className='!bg-white !text-orange-500 border-2 border-orange-500'>
                                    Return Back
                                </Button>
                            </Link>
                    </div>
                    </>
                ) : (
                    <>
                        <h1>Sign in First!</h1>
                        <div className='flex gap-4 mt-3 justify-center'>
                            <Link to='/sign-in-form'>
                                <Button>Proceed To Sign In </Button>
                            </Link>
                            <Button className='!bg-white !text-orange-500 border-2 border-orange-500'>
                                Return Back
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CheckoutPopup;
