import React from 'react'
import useAuth from '../../../context/authContext'

const Profile = () => {
    const {userData} = useAuth();
  return (
    <div className='page-template'>
        <h1>Username: {userData.username}</h1>
        <h1>Email: {userData.email}</h1>
    </div>
  )
}

export default Profile