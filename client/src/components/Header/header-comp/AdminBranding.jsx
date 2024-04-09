import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/horizontallogo.png'

const AdminBranding = () => {
  return (
    <h1 className="text-xl md:text-3xl text-orange-500">
        <Link to='/'>
          <div className='flex items-center justify-between'>
            <img src={logo} alt="logo" className='w-44' />
          </div>
        </Link>
    </h1>
  )
}

export default AdminBranding