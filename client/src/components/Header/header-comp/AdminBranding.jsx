import React from 'react';
import { Link } from 'react-router-dom';

const AdminBranding = () => {
  return (
    <h1 className="text-3xl text-orange-500">
        <Link to='/'>FoodDesk Administrator</Link>
    </h1>
  )
}

export default AdminBranding