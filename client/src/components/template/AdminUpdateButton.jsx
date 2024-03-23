import React from 'react'
import { FaEdit } from "react-icons/fa";

const AdminUpdateButton = ({onClick}) => {
  return (
    <button 
      className='border bg-blue-600 py-1 px-2 rounded-lg text-white font-semibold flex items-center gap-1 justify-center' 
      onClick={onClick}
    >
      <FaEdit />
    </button>
  )
}

export default AdminUpdateButton