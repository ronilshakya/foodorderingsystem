import React, { useState, useEffect } from 'react';
import AdminUpdateButton from '../../template/AdminUpdateButton';
import AdminDeleteButton from '../../template/AdminDeleteButton';
import useGetAllUsers from '../../../hooks/useGetAllUsers';
import './admin.css'
import useRemoveUser from '../../../hooks/useRemoveUser';
import useUpdateUser from '../../../hooks/useUpdateUser';
import Swal from 'sweetalert2';

const Administrator = () => {
  const {users, getAllUsers} = useGetAllUsers();
  const {removeUser} = useRemoveUser(getAllUsers);
  const {updateUser, updatedUser} = useUpdateUser();

  useEffect(()=>{
    if(updatedUser){
      getAllUsers();
    }
  },[updatedUser, getAllUsers])
  
  const handleDelete = (id,username) => e =>{
    Swal.fire({
      title: "Warning",
      text: `Are you sure you want to delete ${username}?`,
      icon:"question",
      position: "center",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#F97316"
    })
    .then(result=>{
      if(result.isConfirmed){
        removeUser(id)
      }
    })
  }

  const handleUpdate = (id, username) => () => {
    Swal.fire({
      title: `Update Username Of ${username}?`,
      html: `
        <input
          placeholder="Set username"
          type="text"
          class="swal2-input"
          id="range-value">`,
      showCancelButton: true,
      confirmButtonText: "Update",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#F97316",
      preConfirm: () => {
        const input = Swal.getPopup().querySelector('#range-value');
        return input.value;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const newUsername = {
          username: result.value
        };
        updateUser(id, newUsername); // Using the id parameter passed to handleUpdate
      }
    });
  };
  

  return (
    <div className='page-template'>
      <h1 className='text-2xl'>All Users</h1>
      <h1 className='text-2xl'>{users.length} Users</h1>
      <div>
        <table className=' rounded-xl table w-3/4'>
          <thead>
            <tr className=''>
              <th>SN.</th>
              <th>Username</th>
              <th>Email</th>
              <th>Registration Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {users.map((user,i) => (
              <tr key={user._id}>
                <td>{i+1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.createdAt}</td>
                <td>
                  <div className='flex'>
                    <AdminUpdateButton  onClick={handleUpdate(user._id, user.username)} />
                    <AdminDeleteButton onClick={handleDelete(user._id, user.username)} />
                  </div>
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
