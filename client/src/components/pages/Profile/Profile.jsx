import React, { useEffect, useState } from 'react';
import UserInfo from './profile-comp/UserInfo';
import OrderHistory from './profile-comp/OrderHistory';
import useAuth from '../../../context/authContext';
import useGetAllFoodItems from '../../../hooks/useGetAllFoodItems';
import useGetOrder from '../../../hooks/useGetOrder';

const Profile = () => {
  const { userData } = useAuth();
  const { orderByUsername, getOrderByUsername } = useGetOrder();
  const { foods, loading: foodsLoading } = useGetAllFoodItems();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userData) {
      getOrderByUsername(userData.username)
        .then(() => setLoading(false))
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [userData, getOrderByUsername]);

  if (loading || foodsLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='page-template'>
      <UserInfo userData={userData} />
      <OrderHistory orderByUsername={orderByUsername} foods={foods}/>
    </div>
  );
};

export default Profile;
