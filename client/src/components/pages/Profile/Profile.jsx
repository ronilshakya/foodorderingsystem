import React, { useEffect, useState } from 'react';
import UserInfo from './profile-comp/UserInfo';
import OrderHistory from './profile-comp/OrderHistory';
import useAuth from '../../../context/authContext';
import useGetOrderHistory from '../../../hooks/useGetOrderHistory';
import useGetAllFoodItems from '../../../hooks/useGetAllFoodItems';

const Profile = () => {
  const { userData } = useAuth();
  const { orderHistoryObject, getOrderHistory } = useGetOrderHistory();
  const { foods, loading: foodsLoading } = useGetAllFoodItems();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userData) {
      getOrderHistory(userData._id)
        .then(() => setLoading(false))
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [userData, getOrderHistory]);

  if (loading || foodsLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='page-template'>
      <UserInfo userData={userData} />
      <OrderHistory orderHistoryObject={orderHistoryObject} foods={foods}/>
    </div>
  );
};

export default Profile;
