import React from 'react';

import axios from 'axios';

const apiCall = () =>{
  axios.get('http://localhost:8000/')
  .then((res)=>{
    console.log(res)
  })
}

const About = () => {
  return (
    <>
      <div className='page-template'>
        About
      <button onClick={apiCall}>Get api</button>
        </div>
    </>
  )
}

export default About