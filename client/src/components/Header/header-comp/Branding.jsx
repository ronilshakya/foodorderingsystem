import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/horizontallogo(light).png';

const Branding = () => {
  return (
    <h1 className="text-xl md:text-3xl text-white">
      <Link to='/'>
        <img src={logo} alt="logo" className='w-44' />
      </Link>
    </h1>
  );
}

export default Branding;
