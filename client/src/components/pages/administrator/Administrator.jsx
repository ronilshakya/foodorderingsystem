import React, { useState, useEffect } from 'react';
import AdminUpdateButton from '../../template/AdminUpdateButton';
import AdminDeleteButton from '../../template/AdminDeleteButton';
import useGetAllUsers from '../../../hooks/useGetAllUsers';
import './admin.css'
import useRemoveUser from '../../../hooks/useRemoveUser';
import useUpdateUser from '../../../hooks/useUpdateUser';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';


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
        updateUser(id, newUsername); 
      }
    });
  };
  

  return (
    <div className='page-template'>
      <h1 className='text-2xl my-4'>All Users</h1>
      <h1 className='text-2xl my-4'>{users.length} Users</h1>
      <div className='flex flex-col'>
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className='min-w-full text-left text-sm font-semibold text-surface'>
              <thead className='bg-orange-500 text-white'>
                <tr>
                  <th scope="col" className="table-data">SN.</th>
                  <th scope="col" className="table-data">Username</th>
                  <th scope="col" className="table-data">Phone Number</th>
                  <th scope="col" className="table-data">Registration Date</th>
                  <th scope="col" className="table-data">User Image</th>
                  <th scope="col" className="table-data">Action</th>
                </tr>
              </thead>
              <tbody>
                {
                users.map((user,i) => (
                    <tr key={user._id}>
                      <td className="table-data whitespace-nowrap">{i+1}</td>
                      <td className="table-data whitespace-nowrap">{user.username}</td>
                      <td className="table-data whitespace-nowrap">{user.phone}</td>
                      <td className="table-data whitespace-nowrap">{user.createdAt}</td>
                      <td className="table-data whitespace-nowrap">
                        <div className='ring-1 ring-orange-500 rounded-full w-12 h-12 overflow-hidden'>
                          <img className='w-20' src={`${import.meta.env.VITE_BASE_URL}/userprofile/${user.profileImage}`} alt="profile" />
                        </div>
                      </td>
                      <td className="table-data whitespace-nowrap">
                        <div className='flex gap-2'>
                          <AdminUpdateButton  onClick={handleUpdate(user._id, user.username)} />
                          <AdminDeleteButton onClick={handleDelete(user._id, user.username)} />
                        </div>
                      </td>
                    </tr>
                ))
            }
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Administrator;
