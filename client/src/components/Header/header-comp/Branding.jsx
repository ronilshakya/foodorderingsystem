import React from 'react';
import { Link } from 'react-router-dom';

const Branding = () => {
  return (
    <h1 className="text-xl md:text-3xl text-white">
        <Link to='/'>FoodDesk</Link>
    </h1>
  )
}

export default Branding