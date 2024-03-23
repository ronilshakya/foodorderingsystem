import React from 'react'
import { FaTrashAlt } from "react-icons/fa";

const AdminDeleteButton = ({onClick}) => {
  return (
    <button 
      className='border bg-red-600 py-1 px-2 rounded-lg text-white font-semibold flex items-center gap-1 justify-center' 
      onClick={onClick}
    >
      <FaTrashAlt />
    </button>
  )
}

export default AdminDeleteButton