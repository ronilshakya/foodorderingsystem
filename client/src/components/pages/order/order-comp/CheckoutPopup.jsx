import React, { useContext,useEffect,useState } from 'react';
import { ShopContext } from '../../../../context/shop-context';
import useGetAllFoodItems from '../../../../hooks/useGetAllFoodItems';
import useAddOrder from '../../../../hooks/useAddOrder';
import Button from '../../../template/Button';
import useAuth from '../../../../context/authContext';
import { Link } from 'react-router-dom';
import Input from '../../../template/Input'
import { useNavigate } from 'react-router-dom';
import useUpdateInventory from '../../../../hooks/useUpdateInventory';
import axios from 'axios';
import Swal from 'sweetalert2';
import { RxCrossCircled } from "react-icons/rx";
import loadingSpinner from '../../../../assets/Spinner-1s-200px.svg'

const CheckoutPopup = () => {
    const navigate = useNavigate();
    const { foods } = useGetAllFoodItems();
    const { isAuthenticated,userData } = useAuth();
    const { cartItems, getTotalAmount } = useContext(ShopContext);
    const totalAmount = getTotalAmount();
    const [checkoutItems, setCheckoutItems] = useState({});
    const {addOrder} = useAddOrder();
    const {updateInventory} = useUpdateInventory();
    const [address, setAddress] = useState();
    const [loading, setLoading] = useState(false)
    

    const handleCheckout = async () => {
        const dateObj = new Date();
        const date = {
            orderTime: dateObj.toLocaleString()
        };
    
        try {
            const inventoryUpdated = await updateInventory({ orderItems: checkoutItems });

            if(address === ''){
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: `Please enter address`,
                    showConfirmButton: true
                })
            }else{
                if (inventoryUpdated) {
                    await addOrder({
                        orderUser: userData.username,
                        orderFoodsHistory: checkoutItems,
                        orderTime: date.orderTime,
                        orderAddress: address
                    });
                    }
                    navigate('/');
            }
        } catch (error) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: `Please enter address`,
                showConfirmButton: true
            })
        }
    };

    useEffect(() => {
        setCheckoutItems(cartItems);
    }, [cartItems]);

    const findLocation = () =>{
        setLoading(true);
        if('geolocation' in navigator){
            navigator.geolocation.getCurrentPosition(async (position)=>{
                try {
                    const {latitude, longitude} = position.coords;
                    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=7a9dcfceaee1a2e400fc1330844f0274`);
                    if(response){
                        setAddress(`${response.data.name}, ${response.data.sys.country}`);
                        setLoading(false)
                    }
                } catch (error) {
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: `Something went wrong`,
                        showConfirmButton: false,
                        timer: 1000
                    })
                }
            })
        }else{
            console.log("Geolocation isn't available in your browser!");
        }
    }

    return (
        <div className='page-template'>
            <div className='md:p-8'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                <div className='flex flex-col justify-center p-5'>
                    <h1 className='text-xl font-semibold'>Your Order</h1>
                    <div className='flex flex-col'>
                            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                    <div class="overflow-hidden">
                                        <table className='border-none min-w-full text-left text-sm font-semibold text-surface'>
                                            <thead className='border-none'>
                                                <tr className='border-none'>
                                                    <th scope="col" className='table-data border-none'>Image</th>
                                                    <th scope="col" className='table-data border-none'>Food Item</th>
                                                    <th scope="col" className='table-data border-none text-center'>Subtotal</th>
                                                </tr> 
                                            </thead>
                                            <tbody>
                                        {foods.map(
                                            (item) =>
                                                cartItems[item._id] !== 0 && (
                                                    <tr key={item._id} className='border-none'>
                                                        <td className='table-data border-none whitespace-nowrap'>
                                                            <img src={`${import.meta.env.VITE_BASE_URL}/images/${item.image}`} className='w-20' alt='pop' />
                                                        </td>
                                                        <td className='table-data border-none whitespace-nowrap'>
                                                            <h1>
                                                                {item.name} x{cartItems[item._id]}
                                                            </h1>
                                                        </td>
                                                        <td className='table-data border-none text-center whitespace-nowrap'>
                                                            <h1 className='text-orange-500 text-lg'>Rs. {cartItems[item._id] * item.price}</h1>
                                                        </td>
                                                    </tr>
                                                )
                                        )}
                                            
                                            <tr className='table-data border-none'>
                                                <td colSpan='2' className='table-data border-none'></td>
                                                <td className='table-data border-none'>
                                                    <h1 className='text-lg text-center py-4 text-orange-500 border-t-2 border-orange-500'>
                                                        Total: Rs {totalAmount}
                                                    </h1>
                                                </td>
                                                
                                            </tr>
                                        </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
                <div className='p-5 flex flex-col justify-evenly'>
                    <div className='flex flex-col my-4 gap-4'>
                        <h1 className='text-xl font-semibold'>Billing Address</h1>
                        <Input type='text' placeholder='Enter Address' onChange={(e)=>setAddress(e.target.value)}/>
                        <h1 className='text-center'>Or</h1>
                        <button
                            className='border p-2 rounded-md text-neutral-600 focus:border-orange-400 focus:outline-none'
                            onClick={()=>findLocation()}
                        >
                            Click to identify current address
                        </button>
                        {loading ? (
                            <img src={loadingSpinner} className='w-12' alt='Loading...' />
                        ) : address ? (
                            <div className='border border-orange-500 p-3 rounded-md flex justify-between'>
                                <p>
                                    <b>Location:</b> {address}
                                </p>
                                <button onClick={() => setAddress(null)} aria-label='Clear address'>
                                    <RxCrossCircled fontSize='1.5em' color='red' />
                                </button>
                            </div>
                        ) : null}
                    </div>
                    <div className='flex flex-col my-4 gap-4'>
                        <h1 className='text-xl font-semibold'>Payment Method</h1>
                        <select name="" id="" className='border border-neutral-400 p-2 rounded-md text-neutral-600 focus:border-orange-400 focus:outline-none'>
                            <option value="">Cash on delivery</option>
                            <option value="">Esewa</option>
                            <option value="">Khalti</option>
                        </select>
                    </div>
                    <div className='flex gap-4 my-6 justify-center col-span-2'>
                        <Button onClick={handleCheckout}>Proceed To Checkout</Button>
                        <Link to='/'>
                            <Button className='!bg-white !text-orange-500 border-2 border-orange-500'>
                                Return Back
                            </Button>
                        </Link>
                    </div>     
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPopup;
