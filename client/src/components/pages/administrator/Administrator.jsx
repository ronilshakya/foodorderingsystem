import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../Sidebar/Sidebar';
import { sidebarItems } from './AdminMenuItems';

const Administrator = () => {
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/auth/getallusers');
      if (response.status === 200) {
        setUsers(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeUser = async(id) =>{
    try{
      const response = await axios.delete(`http://localhost:8000/api/auth/deleteuser/${id}`);
      if(response.status === 200){
        console.log("sucess");
        getAllUsers();
      }
    }catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className='page-template'>
      <h1 className='text-2xl'>All Users</h1>
      <h1 className='text-2xl'>{users.length} Users</h1>
      <div>
        <table className='table-auto'>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <button className='border bg-orange-500' onClick={()=>removeUser(user._id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Administrator;
